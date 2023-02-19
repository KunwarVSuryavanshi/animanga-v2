import React from 'react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';
import { supabase } from '../../config/supabase';
import './Login.scss';

function Login() {
	return (
		<div className='login_container'>
			<div className='form'>
				<Auth
					supabaseClient={supabase}
					appearance={{
						theme: ThemeSupa,
						variables: {
							default: {
								colors: {
									brand: '#09bbad',
									brandAccent: '#057b76',
									// brandButtonText: '#B6FFCE',
									defaultButtonBackground: '#8E05C2',
									defaultButtonBorder: 'black',
									// defaultButtonText: 'red',
									dividerBackground: 'black',
									// inputBackground: 'transparent',
									// inputBorder: 'gray',
									// inputText: '#700B97',
									// inputPlaceholder: 'darkgray',
								},
							},
						},
					}}
					theme='dark'
					socialLayout='horizontal'
					socialButtonSize='tiny'
					providers={['google', 'discord', 'github']}
					redirectTo={
						import.meta.env?.DEV
							? 'http://localhost:6969/'
							: 'https://animanga-v2.vercel.app/'
					}
					magicLink={true}
				/>
			</div>
		</div>
	);
}

export default Login;
