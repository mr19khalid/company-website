import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Video, Grid3x3, RotateCw, ZoomIn, ZoomOut, Upload, Download, Layers, X } from 'lucide-react';

interface ARMaterial {
  id: string;
  name: string;
  type: 'paint' | 'flooring' | 'wallpaper' | 'tile';
  color: string;
  pattern: string;
  thumbnail: string;
  scale: number;
}

const ARVisualizer: React.FC = () => {
  const [mode, setMode] = useState<'camera' | 'upload' | 'sample'>('camera');
  const [selectedMaterial, setSelectedMaterial] = useState<ARMaterial | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [arOverlay, setArOverlay] = useState<boolean>(true);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const materials: ARMaterial[] = [
    {
      id: 'paint-1',
      name: 'Ocean Blue Paint',
      type: 'paint',
      color: '#3B82F6',
      pattern: 'solid',
      thumbnail: 'https://images.unsplash.com/photo-1592890288564-76628a30a657?w=200&h=200&fit=crop',
      scale: 1.0
    },
    {
      id: 'paint-2',
      name: 'Forest Green',
      type: 'paint',
      color: '#10B981',
      pattern: 'solid',
      thumbnail: 'https://images.unsplash.com/photo-1551103782-8ab07afd45c1?w=200&h=200&fit=crop',
      scale: 1.0
    },
    {
      id: 'floor-1',
      name: 'Oak Hardwood',
      type: 'flooring',
      color: '#92400E',
      pattern: 'wood',
      thumbnail: 'https://images.unsplash.com/photo-1592496007188-b8b2c81a1d67?w=200&h=200&fit=crop',
      scale: 0.5
    },
    {
      id: 'wallpaper-1',
      name: 'Geometric Pattern',
      type: 'wallpaper',
      color: '#8B5CF6',
      pattern: 'geometric',
      thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop',
      scale: 2.0
    },
    {
      id: 'tile-1',
      name: 'Subway Tile',
      type: 'tile',
      color: '#F3F4F6',
      pattern: 'tile',
      thumbnail: 'https://images.unsplash.com/photo-1519457431-44ccd64a579b?w=200&h=200&fit=crop',
      scale: 0.3
    }
  ];

  // Initialize camera
  useEffect(() => {
    if (mode === 'camera' && videoRef.current) {
      navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(err => {
        console.error('Camera error:', err);
        setMode('upload');
      });
    }

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [mode]);

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;
    
    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const imageData = canvas.toDataURL('image/jpeg');
    setCapturedImage(imageData);
    setIsCapturing(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setCapturedImage(e.target?.result as string);
      setMode('sample');
    };
    reader.readAsDataURL(file);
  };

  const applyMaterialToImage = () => {
    if (!capturedImage || !selectedMaterial || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    const img = new Image();
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      
      // Apply material overlay (simplified version)
      if (selectedMaterial.type === 'paint') {
        context.fillStyle = selectedMaterial.color + '80'; // 50% opacity
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
      
      setCapturedImage(canvas.toDataURL());
    };
    img.src = capturedImage;
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom max-w-6xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <Camera className="text-white" size={32} />
          </div>
          <span className="text-purple-600 font-semibold">AUGMENTED REALITY</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            AR Room Visualizer
          </h2>
          <p className="text-gray-600">
            See how materials look in your space using your camera or uploaded photos.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main AR View */}
          <div className="lg:col-span-2">
            <div className="bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Mode Toggle */}
              <div className="flex border-b border-gray-800">
                <button
                  onClick={() => setMode('camera')}
                  className={`flex-1 py-4 font-medium ${mode === 'camera' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Camera className="inline mr-2" size={20} />
                  Live Camera
                </button>
                <button
                  onClick={() => setMode('upload')}
                  className={`flex-1 py-4 font-medium ${mode === 'upload' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Upload className="inline mr-2" size={20} />
                  Upload Photo
                </button>
                <button
                  onClick={() => setMode('sample')}
                  className={`flex-1 py-4 font-medium ${mode === 'sample' ? 'bg-gray-800 text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <Grid3x3 className="inline mr-2" size={20} />
                  Sample Room
                </button>
              </div>

              {/* View Area */}
              <div className="relative aspect-video bg-black">
                {mode === 'camera' && !capturedImage && (
                  <>
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-full object-cover"
                    />
                    {arOverlay && (
                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 border-2 border-white/50 rounded-lg">
                          <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-white" />
                          <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-white" />
                          <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-white" />
                          <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-white" />
                        </div>
                        <div className="absolute top-4 left-4 text-white/80 text-sm">
                          Point at a wall or floor
                        </div>
                      </div>
                    )}
                  </>
                )}

                {(mode === 'upload' || capturedImage) && (
                  <div className="relative w-full h-full">
                    <img
                      src={capturedImage || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&auto=format&fit=crop'}
                      alt="Room"
                      className="w-full h-full object-contain"
                    />
                    
                    {selectedMaterial && (
                      <div className="absolute inset-0">
                        {/* Material overlay simulation */}
                        <div 
                          className="absolute inset-0 opacity-50"
                          style={{ 
                            backgroundColor: selectedMaterial.color,
                            backgroundImage: selectedMaterial.pattern === 'wood' 
                              ? `linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%),
                                 linear-gradient(-45deg, rgba(0,0,0,0.1) 25%, transparent 25%)`
                              : selectedMaterial.pattern === 'tile'
                              ? `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px),
                                 repeating-linear-gradient(90deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 40px)`
                              : 'none',
                            backgroundSize: selectedMaterial.pattern === 'wood' ? '40px 40px' : '40px 40px',
                            transform: `scale(${scale}) rotate(${rotation}deg)`,
                            transformOrigin: 'center'
                          }}
                        />
                      </div>
                    )}
                  </div>
                )}

                {/* Controls Overlay */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-4">
                  {mode === 'camera' && !capturedImage && (
                    <button
                      onClick={captureImage}
                      disabled={isCapturing}
                      className="flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-full font-bold hover:bg-gray-100"
                    >
                      {isCapturing ? (
                        <>
                          <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin" />
                          Capturing...
                        </>
                      ) : (
                        <>
                          <Camera size={20} />
                          Capture Photo
                        </>
                      )}
                    </button>
                  )}

                  {capturedImage && (
                    <div className="flex items-center gap-4 bg-black/80 backdrop-blur-sm rounded-full px-6 py-3">
                      <button
                        onClick={() => setScale(s => Math.max(0.5, s - 0.1))}
                        className="text-white hover:text-gray-300"
                      >
                        <ZoomOut size={20} />
                      </button>
                      <span className="text-white font-medium">Scale: {scale.toFixed(1)}x</span>
                      <button
                        onClick={() => setScale(s => Math.min(3, s + 0.1))}
                        className="text-white hover:text-gray-300"
                      >
                        <ZoomIn size={20} />
                      </button>
                      <div className="w-px h-6 bg-gray-600" />
                      <button
                        onClick={() => setRotation(r => r + 15)}
                        className="text-white hover:text-gray-300"
                      >
                        <RotateCw size={20} />
                      </button>
                      <span className="text-white font-medium">Rotate: {rotation}°</span>
                    </div>
                  )}
                </div>

                {/* AR Toggle */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => setArOverlay(!arOverlay)}
                    className={`px-4 py-2 rounded-lg font-medium ${arOverlay ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-300'}`}
                  >
                    {arOverlay ? 'AR On' : 'AR Off'}
                  </button>
                </div>
              </div>

              {/* Hidden canvas for image processing */}
              <canvas ref={canvasRef} className="hidden" />

              {/* Upload Area for Upload Mode */}
              {mode === 'upload' && !capturedImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <label className="cursor-pointer">
                    <div className="text-center p-12 border-2 border-dashed border-gray-700 rounded-2xl hover:border-gray-600">
                      <Upload size={48} className="text-gray-600 mx-auto mb-4" />
                      <div className="text-2xl font-bold text-white mb-2">Upload Room Photo</div>
                      <div className="text-gray-400">or drag and drop</div>
                      <div className="text-sm text-gray-500 mt-2">PNG, JPG up to 10MB</div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                  </label>
                </div>
              )}
            </div>

            {/* Material Preview on Image */}
            {capturedImage && selectedMaterial && (
              <div className="mt-6 bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold">Material Applied</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={applyMaterialToImage}
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                    >
                      Apply to Image
                    </button>
                    <button
                      onClick={() => {
                        if (!canvasRef.current) return;
                        const link = document.createElement('a');
                        link.download = 'room-with-material.jpg';
                        link.href = canvasRef.current.toDataURL('image/jpeg');
                        link.click();
                      }}
                      className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Download size={20} />
                      Download
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div 
                    className="w-24 h-24 rounded-lg"
                    style={{ backgroundColor: selectedMaterial.color }}
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-lg">{selectedMaterial.name}</h4>
                    <p className="text-gray-600">Applied to your room image</p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        Scale: {scale.toFixed(1)}x
                      </span>
                      <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        Rotation: {rotation}°
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Materials Panel */}
          <div className="space-y-6">
            {/* Material Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-lg mb-6">Select Material</h3>
              <div className="space-y-4">
                {materials.map(material => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all
                      ${selectedMaterial?.id === material.id 
                        ? 'border-purple-600 bg-purple-50' 
                        : 'border-gray-200 hover:border-purple-300'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={material.thumbnail}
                          alt={material.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center">
                          {material.type === 'paint' && <Layers size={12} className="text-purple-600" />}
                          {material.type === 'flooring' && <Grid3x3 size={12} className="text-green-600" />}
                          {material.type === 'wallpaper' && <Video size={12} className="text-blue-600" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="font-bold">{material.name}</div>
                        <div className="text-sm text-gray-600 capitalize">{material.type}</div>
                        <div className="flex items-center gap-2 mt-1">
                          <div 
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: material.color }}
                          />
                          <span className="text-sm text-gray-500">{material.pattern}</span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Sample Rooms */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-lg mb-4">Sample Rooms</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { name: 'Living Room', img: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop' },
                  { name: 'Kitchen', img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop' },
                  { name: 'Bathroom', img: 'https://images.unsplash.com/photo-1584622781569-05846503d89a?w=400&h=300&fit=crop' },
                  { name: 'Bedroom', img: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=300&fit=crop' },
                ].map((room, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setCapturedImage(room.img);
                      setMode('sample');
                    }}
                    className="group relative overflow-hidden rounded-lg"
                  >
                    <img
                      src={room.img}
                      alt={room.name}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                    <div className="absolute bottom-2 left-2 text-white font-medium">
                      {room.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AR Instructions */}
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">How to Use AR</h3>
              <ol className="space-y-3 text-sm">
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                    1
                  </div>
                  <span>Select a material from the list</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                    2
                  </div>
                  <span>Use live camera or upload a room photo</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                    3
                  </div>
                  <span>Adjust scale and rotation as needed</span>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mr-3 flex-shrink-0">
                    4
                  </div>
                  <span>Save or share the visualized room</span>
                </li>
              </ol>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-lg mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span>Request Material Sample</span>
                  <Upload size={16} className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span>Share Visualization</span>
                  <Video size={16} className="text-gray-400" />
                </button>
                <button className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <span>Add to Project</span>
                  <Layers size={16} className="text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ARVisualizer;
export {};
