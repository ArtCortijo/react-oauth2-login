import { GoogleLogin } from '@react-oauth/google';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
	return (
		<>
			<div>
				<a href='https://vite.dev' target='_blank'>
					<img src={viteLogo} className='logo' alt='Vite logo' />
				</a>
				<a href='https://react.dev' target='_blank'>
					<img src={reactLogo} className='logo react' alt='React logo' />
				</a>
			</div>
			<h1>React Google Login</h1>
			<div className='google-login'>
				<GoogleLogin
					onSuccess={(credentialResponse) => console.log(credentialResponse)}
					onError={() => {
						console.log('Login Failed');
					}}
				/>
			</div>
			<div className='card'>
				<p>
					Edit <code>src/App.tsx</code> and save to test HMR
				</p>
			</div>
			<p className='read-the-docs'>
				Click on the Vite and React logos to learn more
			</p>
		</>
	);
}

export default App;
