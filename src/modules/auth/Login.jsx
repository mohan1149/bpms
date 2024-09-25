import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { startLogin, getUserData } from './../../apis/services';
import { setUserLoggedStatus, setUser } from './../../redux/reducer';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
const Login = () => {
    const navigte = useNavigate();
    const { t } = useTranslation();
    const store = useStore();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const toast = useRef(null);

    const handleLogin = async () => {
        try {
            setLoading(true);
            let data = {
                email: username,
                password: password
            }
            const res = await startLogin(data);
            localStorage.setItem('_jwt', res.data.access_token);
            const userData = await getUserData();
            if (!userData.data.status) {
                toast.current.show({ severity: 'error', summary: t('request_failed'), detail: t('user_is_suspended'), life: 1000 });
            } else {
                store.dispatch(setUser(userData.data));
                store.dispatch(setUserLoggedStatus(true));
            }
            setLoading(false);
        } catch (error) {
            toast.current.show({ severity: 'error', summary: t('request_failed'), detail: t('bad_credentials'), life: 1000 });
            setLoading(false);
        }
    }
    return (
        <div className="container-fluid">
            <Toast ref={toast}
                severity="danger"
            />
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
                            <h2>Nojoom Partner Portal</h2>
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
                                            <label htmlFor="username" className='required mb-1'>{t('email')}</label>
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
                                            <label htmlFor="password" className='required mb-1'>Password</label>
                                            <input type={showPassword ? "text" : "password"} name="password" id="password" className='form-control p-3' required
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                value={password}

                                            />
                                            <Button
                                                type='button'
                                                severity="secondary"
                                                className='password-toggle icon-btn'
                                                onClick={() => { setShowPassword(!showPassword) }}
                                            >
                                                {
                                                    showPassword &&
                                                    <span className="material-symbols-outlined">
                                                        visibility
                                                    </span>
                                                }
                                                {
                                                    !showPassword &&
                                                    <span className="material-symbols-outlined">
                                                        visibility_off
                                                    </span>
                                                }
                                            </Button>
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <Button label={t("login")} loading={loading} type='submit' className='p-btn' id='loginButton' />
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