import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, FileText, File, Image, FileSpreadsheet, FileArchive, 
  Download, Upload, Share2, Trash2, Edit, Eye, Lock, Unlock,
  CheckCircle, XCircle, Clock, Search, Filter, Grid, List,
  MoreVertical, Star, Tag, Users, History, Link, Copy,
  Printer, Mail, MessageSquare, FolderPlus, FolderOpen,
  ChevronRight, ChevronDown, AlertCircle, Shield, BarChart,
  Archive, RefreshCw, UploadCloud, FolderTree, BookOpen
} from 'lucide-react';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

// Helper functions moved outside
const getDocumentIcon = (type: string) => {
  switch (type) {
    case 'pdf': return <FileText className="text-red-500" size={20} />;
    case 'image': return <Image className="text-green-500" size={20} />;
    case 'doc': return <FileText className="text-blue-500" size={20} />;
    case 'xls': return <FileSpreadsheet className="text-green-600" size={20} />;
    case 'dwg': return <File className="text-purple-500" size={20} />;
    default: return <File className="text-gray-500" size={20} />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'approved': return 'bg-green-100 text-green-700';
    case 'pending': return 'bg-yellow-100 text-yellow-700';
    case 'rejected': return 'bg-red-100 text-red-700';
    case 'draft': return 'bg-gray-100 text-gray-700';
    default: return 'bg-gray-100 text-gray-700';
  }
};

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Mock PDF viewer
const PDFViewer = ({ url }: { url: string }) => (
  <div className="w-full h-full bg-gray-100 rounded-lg flex items-center justify-center">
    <div className="text-center">
      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
      <div className="text-gray-600">PDF Viewer: {url.split('/').pop()}</div>
      <div className="text-sm text-gray-500 mt-2">In production, this would show the actual PDF</div>
    </div>
  </div>
);

interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'image' | 'doc' | 'xls' | 'dwg' | 'other';
  size: string;
  lastModified: Date;
  uploadedBy: string;
  version: number;
  status: 'approved' | 'pending' | 'rejected' | 'draft';
  tags: string[];
  starred: boolean;
  locked: boolean;
  folderId: string;
  downloadUrl: string;
  previewUrl: string;
  description?: string;
  permissions: {
    view: string[];
    edit: string[];
    share: string[];
  };
}

interface Folder {
  id: string;
  name: string;
  parentId: string | null;
  documentCount: number;
  lastModified: Date;
  color: string;
}

const DocumentManager: React.FC = () => {
  // State
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: 'doc-1',
      name: 'Architectural Blueprints - Final',
      type: 'pdf',
      size: '5.7 MB',
      lastModified: new Date(Date.now() - 86400000),
      uploadedBy: 'John Richardson',
      version: 3,
      status: 'approved',
      tags: ['Architecture', 'Floor Plans', 'Approved'],
      starred: true,
      locked: true,
      folderId: 'folder-1',
      downloadUrl: '#',
      previewUrl: '#',
      description: 'Final architectural drawings with all client-approved changes',
      permissions: {
        view: ['team', 'client'],
        edit: ['architect', 'project-manager'],
        share: ['project-manager']
      }
    },
    {
      id: 'doc-2',
      name: 'Construction Contract - Signed',
      type: 'pdf',
      size: '2.1 MB',
      lastModified: new Date(Date.now() - 172800000),
      uploadedBy: 'Sarah Chen',
      version: 2,
      status: 'approved',
      tags: ['Legal', 'Contract', 'Signed'],
      starred: true,
      locked: true,
      folderId: 'folder-2',
      downloadUrl: '#',
      previewUrl: '#',
      permissions: {
        view: ['team', 'client', 'legal'],
        edit: [],
        share: ['project-manager', 'legal']
      }
    },
    {
      id: 'doc-3',
      name: 'Electrical Wiring Diagram',
      type: 'dwg',
      size: '3.4 MB',
      lastModified: new Date(Date.now() - 43200000),
      uploadedBy: 'Mike Rodriguez',
      version: 1,
      status: 'pending',
      tags: ['Electrical', 'Technical', 'In Review'],
      starred: false,
      locked: false,
      folderId: 'folder-3',
      downloadUrl: '#',
      previewUrl: '#',
      permissions: {
        view: ['team', 'electrician'],
        edit: ['electrician', 'project-manager'],
        share: ['project-manager']
      }
    },
    {
      id: 'doc-4',
      name: 'Material Invoice #001',
      type: 'pdf',
      size: '1.2 MB',
      lastModified: new Date(Date.now() - 21600000),
      uploadedBy: 'Alex Johnson',
      version: 1,
      status: 'approved',
      tags: ['Financial', 'Invoice', 'Paid'],
      starred: false,
      locked: false,
      folderId: 'folder-4',
      downloadUrl: '#',
      previewUrl: '#',
      permissions: {
        view: ['team', 'accounting', 'client'],
        edit: ['accounting'],
        share: ['accounting', 'project-manager']
      }
    },
    {
      id: 'doc-5',
      name: 'Site Photos - Week 1',
      type: 'image',
      size: '8.5 MB',
      lastModified: new Date(Date.now() - 7200000),
      uploadedBy: 'Maria Garcia',
      version: 1,
      status: 'approved',
      tags: ['Photos', 'Progress', 'Site'],
      starred: false,
      locked: false,
      folderId: 'folder-5',
      downloadUrl: '#',
      previewUrl: '#',
      permissions: {
        view: ['team', 'client'],
        edit: ['project-manager'],
        share: ['project-manager']
      }
    }
  ]);

  const [folders, setFolders] = useState<Folder[]>([
    { id: 'folder-1', name: 'Architectural Drawings', parentId: null, documentCount: 12, lastModified: new Date(Date.now() - 86400000), color: '#3B82F6' },
    { id: 'folder-2', name: 'Contracts & Legal', parentId: null, documentCount: 8, lastModified: new Date(Date.now() - 172800000), color: '#10B981' },
    { id: 'folder-3', name: 'Technical Specifications', parentId: null, documentCount: 15, lastModified: new Date(Date.now() - 43200000), color: '#F59E0B' },
    { id: 'folder-4', name: 'Financial Documents', parentId: null, documentCount: 25, lastModified: new Date(Date.now() - 21600000), color: '#8B5CF6' },
    { id: 'folder-5', name: 'Progress Photos', parentId: null, documentCount: 48, lastModified: new Date(Date.now() - 7200000), color: '#EC4899' },
    { id: 'folder-6', name: 'Permits & Approvals', parentId: null, documentCount: 6, lastModified: new Date(Date.now() - 345600000), color: '#6366F1' },
  ]);

  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState<File[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filter documents
  const filteredDocuments = documents.filter(doc => {
    if (selectedFolder && doc.folderId !== selectedFolder) return false;
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filterStatus !== 'all' && doc.status !== filterStatus) return false;
    if (filterType !== 'all' && doc.type !== filterType) return false;
    return true;
  });

  // Handle file upload
  const handleFileUpload = (files: FileList) => {
    const newFiles = Array.from(files);
    setUploadingFiles(prev => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach(file => {
      const fileId = `upload-${Date.now()}-${Math.random()}`;
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            // Add to documents
            const newDoc: Document = {
              id: `doc-${Date.now()}`,
              name: file.name,
              type: file.type.includes('pdf') ? 'pdf' : 
                    file.type.includes('image') ? 'image' : 
                    file.type.includes('word') ? 'doc' : 
                    file.type.includes('excel') ? 'xls' : 'other',
              size: formatFileSize(file.size),
              lastModified: new Date(),
              uploadedBy: 'Current User',
              version: 1,
              status: 'draft',
              tags: ['New'],
              starred: false,
              locked: false,
              folderId: selectedFolder || 'folder-1',
              downloadUrl: '#',
              previewUrl: '#',
              permissions: {
                view: ['team'],
                edit: ['team'],
                share: ['project-manager']
              }
            };
            setDocuments(prev => [...prev, newDoc]);
            setUploadingFiles(prev => prev.filter(f => f !== file));
          }, 500);
        }
        setUploadProgress(prev => ({ ...prev, [fileId]: Math.min(progress, 100) }));
      }, 200);
    });
  };

  // Toggle folder expansion
  const toggleFolder = (folderId: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderId)) {
      newExpanded.delete(folderId);
    } else {
      newExpanded.add(folderId);
    }
    setExpandedFolders(newExpanded);
  };

  // Handle document actions
  const handleDocumentAction = (action: string, documentId: string) => {
    const document = documents.find(d => d.id === documentId);
    if (!document) return;

    switch (action) {
      case 'star':
        setDocuments(prev => prev.map(d => 
          d.id === documentId ? { ...d, starred: !d.starred } : d
        ));
        break;
      case 'lock':
        setDocuments(prev => prev.map(d => 
          d.id === documentId ? { ...d, locked: !d.locked } : d
        ));
        break;
      case 'delete':
        if (window.confirm(`Are you sure you want to delete "${document.name}"?`)) {
          setDocuments(prev => prev.filter(d => d.id !== documentId));
          if (selectedDocument?.id === documentId) {
            setSelectedDocument(null);
            setShowPreview(false);
          }
        }
        break;
      case 'download':
        // In real app, trigger download
        console.log('Downloading:', document.name);
        break;
      case 'preview':
        setSelectedDocument(document);
        setShowPreview(true);
        break;
      case 'share':
        setSelectedDocument(document);
        setShowShareModal(true);
        break;
      case 'version':
        setSelectedDocument(document);
        setShowVersionHistory(true);
        break;
    }
  };

  return (
    <section className="section-padding bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom max-w-7xl">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mb-4">
            <Folder className="text-white" size={32} />
          </div>
          <span className="text-blue-600 font-semibold">DOCUMENT MANAGEMENT</span>
          <h2 className="text-4xl font-bold mt-2 mb-4">
            Professional Document System
          </h2>
          <p className="text-gray-600">
            Manage all your construction documents, blueprints, contracts, and files in one secure place.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-white">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold">Document Manager</h3>
                <p className="text-gray-600">
                  {filteredDocuments.length} documents • {folders.length} folders
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search documents..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>

                {/* View Mode Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : 'text-gray-600'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : 'text-gray-600'}`}
                  >
                    <List size={20} />
                  </button>
                </div>

                {/* Upload Button */}
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:opacity-90"
                >
                  <Upload size={20} />
                  Upload
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  multiple
                  onChange={(e) => e.target.files && handleFileUpload(e.target.files)}
                  className="hidden"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Filter size={18} className="text-gray-500" />
                <span className="text-sm font-medium">Filter by:</span>
              </div>
              
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
                <option value="draft">Draft</option>
              </select>

              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="pdf">PDF</option>
                <option value="image">Images</option>
                <option value="doc">Documents</option>
                <option value="xls">Spreadsheets</option>
                <option value="dwg">CAD Files</option>
              </select>

              <button
                onClick={() => {
                  setFilterStatus('all');
                  setFilterType('all');
                  setSearchQuery('');
                  setSelectedFolder(null);
                }}
                className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                Clear Filters
              </button>
            </div>
          </div>

          <div className="flex h-[700px]">
            {/* Left Sidebar - Folders */}
            <div className="w-64 border-r flex flex-col">
              <div className="p-4 border-b">
                <h4 className="font-bold text-lg mb-4">Folders</h4>
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 mb-4"
                >
                  <FolderPlus size={18} />
                  New Folder
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-2">
                <div className="space-y-1">
                  {/* All Documents */}
                  <button
                    onClick={() => setSelectedFolder(null)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg ${!selectedFolder ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100'}`}
                  >
                    <FolderOpen size={20} />
                    <span className="font-medium">All Documents</span>
                    <span className="ml-auto text-sm text-gray-500">{documents.length}</span>
                  </button>

                  {/* Starred */}
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <Star size={20} className="text-yellow-500" />
                    <span className="font-medium">Starred</span>
                    <span className="ml-auto text-sm text-gray-500">
                      {documents.filter(d => d.starred).length}
                    </span>
                  </button>

                  {/* Recent */}
                  <button className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100">
                    <Clock size={20} className="text-gray-500" />
                    <span className="font-medium">Recent</span>
                  </button>

                  {/* Divider */}
                  <div className="border-t my-2" />

                  {/* Folder List */}
                  {folders.map(folder => (
                    <div key={folder.id} className="space-y-1">
                      <button
                        onClick={() => {
                          if (selectedFolder === folder.id) {
                            setSelectedFolder(null);
                          } else {
                            setSelectedFolder(folder.id);
                          }
                          toggleFolder(folder.id);
                        }}
                        className={`w-full flex items-center gap-3 p-3 rounded-lg ${selectedFolder === folder.id ? 'bg-blue-50' : 'hover:bg-gray-100'}`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <div
                            className="w-8 h-8 rounded flex items-center justify-center"
                            style={{ backgroundColor: folder.color }}
                          >
                            <Folder size={16} className="text-white" />
                          </div>
                          <div className="text-left flex-1">
                            <div className="font-medium truncate">{folder.name}</div>
                            <div className="text-xs text-gray-500">
                              {folder.documentCount} documents
                            </div>
                          </div>
                        </div>
                        {expandedFolders.has(folder.id) ? (
                          <ChevronDown size={16} />
                        ) : (
                          <ChevronRight size={16} />
                        )}
                      </button>

                      {/* Subfolders (expanded view) */}
                      {expandedFolders.has(folder.id) && (
                        <div className="ml-8 space-y-1">
                          {['Drafts', 'Approved', 'Archived'].map(subfolder => (
                            <button
                              key={subfolder}
                              className="w-full flex items-center gap-2 p-2 text-sm rounded hover:bg-gray-100"
                            >
                              <Folder size={14} className="text-gray-500" />
                              <span>{subfolder}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Storage Usage */}
              <div className="p-4 border-t">
                <div className="mb-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">Storage Used</span>
                    <span className="font-medium">4.2 GB of 50 GB</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-500"
                      style={{ width: '8.4%' }}
                    />
                  </div>
                </div>
                <button className="w-full text-sm text-blue-600 hover:text-blue-700 mt-2">
                  Upgrade Storage
                </button>
              </div>
            </div>

            {/* Main Content - Documents */}
            <div className="flex-1 overflow-y-auto p-6">
              {/* Uploading Files */}
              {uploadingFiles.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-bold text-lg mb-3">Uploading Files</h4>
                  <div className="space-y-3">
                    {uploadingFiles.map((file, index) => {
                      const fileId = `upload-${index}`;
                      const progress = uploadProgress[fileId] || 0;
                      return (
                        <div key={index} className="p-4 border border-gray-200 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-3">
                              {getDocumentIcon(file.type.includes('pdf') ? 'pdf' : 'other')}
                              <div>
                                <div className="font-medium">{file.name}</div>
                                <div className="text-sm text-gray-500">
                                  {formatFileSize(file.size)}
                                </div>
                              </div>
                            </div>
                            <div className="text-sm font-medium">{Math.round(progress)}%</div>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300"
                              style={{ width: `${progress}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Document Grid/List */}
              {viewMode === 'grid' ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredDocuments.map(doc => (
                    <DocumentCard
                      key={doc.id}
                      document={doc}
                      onAction={handleDocumentAction}
                      onSelect={() => {
                        setSelectedDocument(doc);
                        setShowPreview(true);
                      }}
                    />
                  ))}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Type</th>
                        <th className="text-left py-3 px-4">Size</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-left py-3 px-4">Last Modified</th>
                        <th className="text-left py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDocuments.map(doc => (
                        <tr key={doc.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              {getDocumentIcon(doc.type)}
                              <div>
                                <div className="font-medium">{doc.name}</div>
                                <div className="text-sm text-gray-500">
                                  {folders.find(f => f.id === doc.folderId)?.name}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                              {doc.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="py-3 px-4">{doc.size}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                              {doc.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-sm">
                              {format(doc.lastModified, 'MMM d, yyyy')}
                            </div>
                            <div className="text-xs text-gray-500">
                              by {doc.uploadedBy}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDocumentAction('preview', doc.id)}
                                className="p-1 text-gray-600 hover:text-blue-600"
                                title="Preview"
                              >
                                <Eye size={16} />
                              </button>
                              <button
                                onClick={() => handleDocumentAction('download', doc.id)}
                                className="p-1 text-gray-600 hover:text-green-600"
                                title="Download"
                              >
                                <Download size={16} />
                              </button>
                              <button
                                onClick={() => handleDocumentAction('share', doc.id)}
                                className="p-1 text-gray-600 hover:text-purple-600"
                                title="Share"
                              >
                                <Share2 size={16} />
                              </button>
                              <button
                                onClick={() => handleDocumentAction('star', doc.id)}
                                className="p-1 text-gray-600 hover:text-yellow-600"
                                title={doc.starred ? 'Unstar' : 'Star'}
                              >
                                <Star size={16} fill={doc.starred ? 'currentColor' : 'none'} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {filteredDocuments.length === 0 && (
                <div className="text-center py-12">
                  <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h4 className="text-xl font-bold text-gray-600 mb-2">No documents found</h4>
                  <p className="text-gray-500 mb-6">
                    {searchQuery ? 'Try a different search term' : 'Upload your first document to get started'}
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg font-bold hover:opacity-90"
                  >
                    Upload Document
                  </button>
                </div>
              )}
            </div>

            {/* Right Sidebar - Preview/Details */}
            <AnimatePresence>
              {showPreview && selectedDocument && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: '400px', opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="border-l overflow-hidden"
                >
                  <div className="p-6 h-full overflow-y-auto">
                    {/* Preview Header */}
                    <div className="flex items-center justify-between mb-6">
                      <h4 className="font-bold text-lg">Document Preview</h4>
                      <button
                        onClick={() => setShowPreview(false)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <XCircle size={20} />
                      </button>
                    </div>

                    {/* Document Preview */}
                    <div className="mb-6">
                      <div className="h-64 bg-gray-100 rounded-lg mb-4 overflow-hidden">
                        <PDFViewer url={selectedDocument.previewUrl} />
                      </div>
                      
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {getDocumentIcon(selectedDocument.type)}
                          <div>
                            <h5 className="font-bold">{selectedDocument.name}</h5>
                            <div className="text-sm text-gray-600">
                              {selectedDocument.size} • v{selectedDocument.version}
                            </div>
                          </div>
                        </div>
                        {selectedDocument.starred && <Star size={20} className="text-yellow-500 fill-yellow-500" />}
                      </div>

                      {/* Status */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedDocument.status)}`}>
                          {selectedDocument.status}
                        </span>
                        {selectedDocument.locked && <Lock size={16} className="text-gray-500" />}
                      </div>

                      {/* Description */}
                      {selectedDocument.description && (
                        <p className="text-gray-700 mb-4">{selectedDocument.description}</p>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {selectedDocument.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Document Info */}
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Uploaded by:</span>
                          <span className="font-medium">{selectedDocument.uploadedBy}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last modified:</span>
                          <span className="font-medium">
                            {format(selectedDocument.lastModified, 'MMM d, yyyy h:mm a')}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Folder:</span>
                          <span className="font-medium">
                            {folders.find(f => f.id === selectedDocument.folderId)?.name}
                          </span>
                        </div>
                      </div>

                      {/* Quick Actions */}
                      <div className="grid grid-cols-2 gap-3 mb-6">
                        <button
                          onClick={() => handleDocumentAction('download', selectedDocument.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                          <Download size={16} />
                          Download
                        </button>
                        <button
                          onClick={() => handleDocumentAction('share', selectedDocument.id)}
                          className="flex items-center justify-center gap-2 px-4 py-2 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50"
                        >
                          <Share2 size={16} />
                          Share
                        </button>
                      </div>

                      {/* Version History */}
                      <button
                        onClick={() => setShowVersionHistory(true)}
                        className="w-full flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
                      >
                        <div className="flex items-center gap-2">
                          <History size={16} />
                          <span>Version History</span>
                        </div>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-4 gap-6 mt-12">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="text-blue-600" size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2">Secure Storage</h4>
            <p className="text-gray-600">Military-grade encryption for all your documents</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-blue-600" size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2">PDF Annotations</h4>
            <p className="text-gray-600">Mark up blueprints and documents directly in browser</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="text-blue-600" size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2">Team Collaboration</h4>
            <p className="text-gray-600">Real-time collaboration on documents</p>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BarChart className="text-blue-600" size={24} />
            </div>
            <h4 className="font-bold text-lg mb-2">Version Control</h4>
            <p className="text-gray-600">Track every change with complete version history</p>
          </div>
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h4 className="font-bold text-lg mb-4">Upload Documents</h4>
              {/* Upload modal content */}
            </div>
          </div>
        )}

        {/* Share Modal */}
        {showShareModal && selectedDocument && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6">
              <h4 className="font-bold text-lg mb-4">Share "{selectedDocument.name}"</h4>
              {/* Share modal content */}
            </div>
          </div>
        )}

        {/* Version History Modal */}
        {showVersionHistory && selectedDocument && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-2xl w-full p-6">
              <h4 className="font-bold text-lg mb-4">Version History: {selectedDocument.name}</h4>
              {/* Version history content */}
            </div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Sub-components
interface DocumentCardProps {
  document: Document;
  onAction: (action: string, documentId: string) => void;
  onSelect: () => void;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onAction, onSelect }) => {
  const [showActions, setShowActions] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
      {/* Card Header */}
      <div 
        className="p-4 border-b cursor-pointer hover:bg-gray-50"
        onClick={onSelect}
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            {getDocumentIcon(document.type)}
            <div>
              <h5 className="font-bold truncate max-w-[200px]">{document.name}</h5>
              <div className="text-sm text-gray-500">
                {format(document.lastModified, 'MMM d, yyyy')}
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAction('star', document.id);
            }}
            className="text-gray-400 hover:text-yellow-500"
          >
            <Star size={18} fill={document.starred ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-2">
          {document.tags.slice(0, 2).map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
              {tag}
            </span>
          ))}
          {document.tags.length > 2 && (
            <span className="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded">
              +{document.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Card Body */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm text-gray-600">{document.size}</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(document.status)}`}>
            {document.status}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => onAction('preview', document.id)}
              className="p-1.5 text-gray-600 hover:text-blue-600"
              title="Preview"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => onAction('download', document.id)}
              className="p-1.5 text-gray-600 hover:text-green-600"
              title="Download"
            >
              <Download size={16} />
            </button>
            <button
              onClick={() => onAction('share', document.id)}
              className="p-1.5 text-gray-600 hover:text-purple-600"
              title="Share"
            >
              <Share2 size={16} />
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowActions(!showActions)}
              className="p-1.5 text-gray-600 hover:text-gray-900"
            >
              <MoreVertical size={16} />
            </button>

            {showActions && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  onClick={() => {
                    onAction('edit', document.id);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100"
                >
                  <Edit size={14} />
                  Rename
                </button>
                <button
                  onClick={() => {
                    onAction('version', document.id);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100"
                >
                  <History size={14} />
                  Version History
                </button>
                <button
                  onClick={() => {
                    onAction('lock', document.id);
                    setShowActions(false);
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-left hover:bg-gray-100"
                >
                  {document.locked ? <Unlock size={14} /> : <Lock size={14} />}
                  {document.locked ? 'Unlock' : 'Lock'}
                </button>
                <div className="border-t">
                  <button
                    onClick={() => {
                      onAction('delete', document.id);
                      setShowActions(false);
                    }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentManager;
export {};
