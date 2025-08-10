import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default {
  plugins: [react()],
  server: {
    port: 3000,
    host: true,
  },
}
