import AmplifyReduxAuth from '../components/auth/Wrapper';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <AmplifyReduxAuth header={false}>
      <h1>You've already signed in!</h1>
      <p>
        <Link to="/video/2">Go to the sample video</Link>
      </p>
    </AmplifyReduxAuth>
  );
}
