import React, { useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { startLogin } from './../../apis/services';
import ButtonLoadingIndicator from './../../widgets/ButtonLoadingIndicator';
import { setUserLoggedStatus, setUser } from './../../redux/reducer';
import { IconButton } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Login = () => {
    const navigte = useNavigate();
    const { t } = useTranslation();
    const store = useStore();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);


    const handleLogin = async () => {
        try {
            setLoading(true);
            let data = {
                email: username,
                password: password
            }
            const res = await startLogin(data);
            if (!res.data.error) {
                localStorage.setItem('access_token', res.data.access_token);
                store.dispatch(setUser(res.data.user));
                store.dispatch(setUserLoggedStatus(true));
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }


    return (
        <div className="container-fluid">
            <div className='row'>
                <div className="col-lg-6 col-md-6 d-none d-lg-block d-md-block p-0">
                    <div className='vh-center bg-img-vhicle'>
                        <div
                            style={{
                                borderLeft: '4px solid #FFF',
                                paddingLeft: 10,
                            }}
                        >
                            <h1>Ooredoo</h1>
                            <h2>CDR Portal</h2>
                        </div>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 d-lg-block d-md-block">
                    <div className='vh-center'>
                        <div className="login_form_container">
                            <div className="login_form_logo_container">
                                <img src="/assets/img/logo.png" className='logo' />
                            </div>
                            <p className="title">{t('login_title')}</p>
                            <form action="" method="post"
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleLogin();
                                }}
                            >
                                <div className="row">
                                    <div className="col-12">
                                        <div className="form-group">
                                            <label htmlFor="username" className='required mb-2'>Username/Email</label>
                                            <input type="text" name="username" id="username" className='form-control p-3' required
                                                onChange={(e) => {
                                                    setUsername(e.target.value);
                                                }}
                                                value={username}
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12 mt-3">
                                        <div className="form-group">
                                            <label htmlFor="password" className='required mb-2'>Password</label>
                                            <input type={showPassword ? "text" : "password"} name="password" id="password" className='form-control p-3' required
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                value={password}
                                            />
                                            <IconButton
                                                className='password-toggle'
                                                onClick={() => { setShowPassword(!showPassword) }}
                                            >
                                                {
                                                    showPassword &&
                                                    <VisibilityIcon className='' />
                                                }
                                                {
                                                    !showPassword &&
                                                    <VisibilityOffIcon className='' />
                                                }

                                            </IconButton>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <LoadingButton
                                            loadingIndicator={
                                                <ButtonLoadingIndicator color="primary" size={40} thickness={5} />
                                            }
                                            type='submit'
                                            loading={loading}
                                            loadingPosition="center"
                                            className='sign_in_btn btn-red'
                                            variant="contained"
                                        >
                                            {t("login")}
                                        </LoadingButton>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login;