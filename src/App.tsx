import { useState, useEffect } from 'react';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import axios from 'axios';

interface UserResponse {
	access_token: string;
	[key: string]: any;
}

interface ProfileData {
	name: string;
	email: string;
	picture: string;
	[key: string]: any;
}

function App() {
	const [user, setUser] = useState<UserResponse | null>(null);
	const [profile, setProfile] = useState<ProfileData | null>(null);

	const logIn = useGoogleLogin({
		onSuccess: (codeResponse) => setUser(codeResponse),
		onError: (error) => console.log('Login Failed:', error),
	});

	const logOut = (): void => {
		googleLogout();
		setProfile(null);
	};

	useEffect(() => {
		if (user && user.access_token) {
			axios
				.get<ProfileData>(
					`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${user.access_token}`,
					{
						headers: {
							Authorization: `Bearer ${user.access_token}`,
							Accept: 'application/json',
						},
					}
				)
				.then((response) => setProfile(response.data))
				.catch((error) => console.log(error));
		}
		return () => {
			setUser(null);
			setProfile(null);
		};
	}, [user]);

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
			{profile ? (
				<div>
					<img src={profile.picture} alt={profile.name} />
					<h3>User logged in</h3>
					<p>Name: {profile.name}</p>
					<p>Email: {profile.email}</p>
					<button className='logout-btn' onClick={logOut}>
						Logout
					</button>
				</div>
			) : (
				<div>
					<button className='login-btn' onClick={() => logIn()}>
						Login with Google
					</button>
				</div>
			)}

			{/* <div className='google-login'>
				<GoogleLogin
					onSuccess={(credentialResponse) => console.log(credentialResponse)}
					onError={() => {
						console.log('Login Failed');
					}}
				/>
			</div> */}
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
