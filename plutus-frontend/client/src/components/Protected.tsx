import { Navigate } from 'react-router-dom'

function Protected({ isSignedIn, children }) {
  if (isSignedIn === "false") {
    return <Navigate to="/" replace />
  }
  return children
}
export default Protected;
