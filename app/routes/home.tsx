import { redirect } from 'react-router';
import { Login } from '~/components/login/login';
import { isAuth } from '~/services/auth';

/**
 * I use clientLoader which is CSR and not loader (SSR),
 * It's meant for client-side authentication. For SSR with Firebase auth, you need to handle session tokens.
 */
export async function clientLoader() {
  // mock slow response from firebase
  await new Promise((resolve) =>
    setTimeout(() => {
      resolve(undefined);
    }, 2000)
  );
  const isLogged = await isAuth();
  if (isLogged) {
    return redirect('/dashboard');
  }
}

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-60">
      <h1 className="text-3xl font-bold mb-4 text-center">Welcome to User KYC Demo</h1>
      <p className='text-center text-sm text-gray-500 max-w-xs'>This is a demo app to showcase a KYC journey using React Router and Firebase Authentication.</p>
      <div className="mt-4 w-full max-w-md">
        <Login />
      </div>
    </div>
  );
}
