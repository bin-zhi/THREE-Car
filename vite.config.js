import path from 'path'
export default {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // assetsInclude: ['.gltf', '.glb', '.fbx']
  server: {
    host: '0.0.0.0',
  },
}
