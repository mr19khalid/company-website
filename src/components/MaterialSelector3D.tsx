import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Palette, Droplets, Box, RotateCw, ZoomIn, ZoomOut, Layers, Eye, EyeOff } from 'lucide-react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

interface MaterialOption {
  id: string;
  name: string;
  type: 'paint' | 'wood' | 'stone' | 'metal';
  color: string;
  texture: string;
  finish: 'matte' | 'satin' | 'glossy';
  durability: number;
  price: number;
  description: string;
}

// Simple 3D Cube without texture loading issues
const MaterialCube: React.FC<{ material: MaterialOption }> = ({ material }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial
        color={material.color}
        roughness={material.finish === 'glossy' ? 0.1 : material.finish === 'satin' ? 0.5 : 0.9}
        metalness={material.type === 'metal' ? 0.9 : 0.1}
      />
    </mesh>
  );
};

const MaterialSelector3D: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<'paint' | 'wood' | 'stone' | 'metal'>('paint');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('paint-1');
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [selectedRoom, setSelectedRoom] = useState<'living' | 'kitchen' | 'bathroom' | 'exterior'>('living');

  const materials: MaterialOption[] = [
    // Paints
    {
      id: 'paint-1',
      name: 'Ocean Breeze',
      type: 'paint',
      color: '#3B82F6',
      texture: '',
      finish: 'satin',
      durability: 8,
      price: 45,
      description: 'Premium interior paint with washable finish'
    },
    {
      id: 'paint-2',
      name: 'Forest Green',
      type: 'paint',
      color: '#10B981',
      texture: '',
      finish: 'matte',
      durability: 7,
      price: 42,
      description: 'Eco-friendly matte finish'
    },
    {
      id: 'paint-3',
      name: 'Sunset Glow',
      type: 'paint',
      color: '#F59E0B',
      texture: '',
      finish: 'glossy',
      durability: 9,
      price: 48,
      description: 'High-gloss exterior paint'
    },
    // Wood
    {
      id: 'wood-1',
      name: 'Oak Classic',
      type: 'wood',
      color: '#92400E',
      texture: '',
      finish: 'satin',
      durability: 9,
      price: 85,
      description: 'Premium oak with natural grain'
    },
    {
      id: 'wood-2',
      name: 'Walnut Modern',
      type: 'wood',
      color: '#1F2937',
      texture: '',
      finish: 'matte',
      durability: 8,
      price: 95,
      description: 'Dark walnut with modern finish'
    },
    // Stone
    {
      id: 'stone-1',
      name: 'Marble Elegance',
      type: 'stone',
      color: '#F3F4F6',
      texture: '',
      finish: 'glossy',
      durability: 10,
      price: 120,
      description: 'Italian marble with polished finish'
    },
    // Metal
    {
      id: 'metal-1',
      name: 'Brushed Nickel',
      type: 'metal',
      color: '#6B7280',
      texture: '',
      finish: 'satin',
      durability: 10,
      price: 65,
      description: 'Modern brushed finish'
    }
  ];

  const categories = [
    { id: 'paint', label: 'Paints', icon: Palette, count: 3 },
    { id: 'wood', label: 'Wood', icon: Droplets, count: 2 },
    { id: 'stone', label: 'Stone', icon: Box, count: 1 },
    { id: 'metal', label: 'Metal', icon: Layers, count: 1 },
  ];

  const rooms = [
    { id: 'living', label: 'Living Room', color: '#FBBF24' },
    { id: 'kitchen', label: 'Kitchen', color: '#10B981' },
    { id: 'bathroom', label: 'Bathroom', color: '#3B82F6' },
    { id: 'exterior', label: 'Exterior', color: '#8B5CF6' },
  ];

  const filteredMaterials = materials.filter(m => m.type === selectedCategory);
  const currentMaterial = materials.find(m => m.id === selectedMaterial) || materials[0];

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
            <Palette className="text-primary-600" size={32} />
          </div>
          <span className="text-primary-600 font-semibold">MATERIAL SELECTOR</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Interactive 3D Material Visualizer
          </h2>
          <p className="text-gray-600">
            View and compare materials in 3D. See how different paints, woods, and stones will look in your space.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Material Selection Panel */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* View Mode Toggle */}
              <div className="flex items-center justify-between p-6 border-b">
                <div>
                  <h3 className="text-2xl font-bold">Material Preview</h3>
                  <p className="text-gray-600">Currently viewing: {currentMaterial.name}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('3d')}
                      className={`px-4 py-2 rounded-md font-medium ${viewMode === '3d' ? 'bg-white shadow' : 'text-gray-600'}`}
                    >
                      <Eye size={20} className="inline mr-2" />
                      3D View
                    </button>
                    <button
                      onClick={() => setViewMode('2d')}
                      className={`px-4 py-2 rounded-md font-medium ${viewMode === '2d' ? 'bg-white shadow' : 'text-gray-600'}`}
                    >
                      <EyeOff size={20} className="inline mr-2" />
                      2D View
                    </button>
                  </div>
                </div>
              </div>

              {/* 3D/2D Viewer */}
              <div className="relative h-96 bg-gradient-to-br from-gray-900 to-gray-800">
                {viewMode === '3d' ? (
                  <Canvas camera={{ position: [5, 5, 5], fov: 50 }}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} />
                    <MaterialCube material={currentMaterial} />
                    <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} />
                    <Environment preset="city" />
                  </Canvas>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div 
                      className="w-64 h-64 rounded-2xl shadow-2xl"
                      style={{ 
                        backgroundColor: currentMaterial.color,
                        transform: `scale(${zoom}) rotate(${rotation}deg)`
                      }}
                    />
                  </div>
                )}

                {/* Viewer Controls */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
                  <button
                    onClick={() => setZoom(z => Math.max(0.5, z - 0.1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ZoomOut size={20} />
                  </button>
                  <span className="font-medium">Zoom: {zoom.toFixed(1)}x</span>
                  <button
                    onClick={() => setZoom(z => Math.min(3, z + 0.1))}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <ZoomIn size={20} />
                  </button>
                  <div className="w-px h-6 bg-gray-300 mx-2" />
                  <button
                    onClick={() => setRotation(r => r + 90)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <RotateCw size={20} />
                  </button>
                  <span className="font-medium">Rotate</span>
                </div>
              </div>

              {/* Room Selection */}
              <div className="p-6 border-t">
                <h4 className="font-bold text-lg mb-4">View in Different Rooms</h4>
                <div className="flex gap-4">
                  {rooms.map(room => (
                    <button
                      key={room.id}
                      onClick={() => setSelectedRoom(room.id as any)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all
                        ${selectedRoom === room.id 
                          ? 'bg-primary-600 text-white' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                      style={selectedRoom === room.id ? { backgroundColor: room.color } : {}}
                    >
                      {room.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Material Details Panel */}
          <div className="space-y-6">
            {/* Category Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-lg mb-4">Material Categories</h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map(category => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id as any)}
                      className={`p-4 rounded-xl border-2 text-center transition-all
                        ${selectedCategory === category.id 
                          ? 'border-primary-600 bg-primary-50' 
                          : 'border-gray-200 hover:border-primary-300'}`}
                    >
                      <Icon size={24} className="mx-auto mb-2" />
                      <div className="font-medium">{category.label}</div>
                      <div className="text-sm text-gray-600">{category.count} options</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material Selection */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h3 className="font-bold text-lg mb-4">Available Materials</h3>
              <div className="space-y-4">
                {filteredMaterials.map(material => (
                  <button
                    key={material.id}
                    onClick={() => setSelectedMaterial(material.id)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all
                      ${selectedMaterial === material.id 
                        ? 'border-primary-600 bg-primary-50' 
                        : 'border-gray-200 hover:border-primary-300'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg"
                        style={{ backgroundColor: material.color }}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="font-bold">{material.name}</div>
                            <div className="text-sm text-gray-600">{material.type}</div>
                          </div>
                          <div className="font-bold">${material.price}/gal</div>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="px-2 py-1 bg-gray-100 rounded">
                            {material.finish}
                          </span>
                          <div className="flex items-center">
                            <div className="w-2 h-2 bg-green-500 rounded-full mr-1" />
                            Durability: {material.durability}/10
                          </div>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Current Material Details */}
            <div className="bg-gradient-to-r from-primary-600 to-secondary-500 text-white rounded-2xl p-6">
              <h3 className="font-bold text-lg mb-4">Selected Material Details</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Material:</span>
                  <span className="font-bold">{currentMaterial.name}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Type:</span>
                  <span className="font-bold">{currentMaterial.type}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Finish:</span>
                  <span className="font-bold">{currentMaterial.finish}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Durability:</span>
                  <div className="w-32 h-2 bg-white/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-white rounded-full"
                      style={{ width: `${currentMaterial.durability * 10}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Price:</span>
                  <span className="text-2xl font-bold">${currentMaterial.price}/gal</span>
                </div>
              </div>
              <p className="mt-4 text-white/90 text-sm">
                {currentMaterial.description}
              </p>
              <div className="flex gap-4 mt-6">
                <button className="flex-1 bg-white text-primary-600 py-3 rounded-lg font-bold hover:bg-gray-100">
                  Add to Project
                </button>
                <button className="flex-1 bg-transparent border-2 border-white py-3 rounded-lg font-bold hover:bg-white/10">
                  Request Sample
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialSelector3D;