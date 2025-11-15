// Minimal module shims to allow importing plain JavaScript modules
// Keep a generic JS module declaration for default imports only.
declare module '*.js' {
  const content: any
  export default content
}
