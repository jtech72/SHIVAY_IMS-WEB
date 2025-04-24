import React, { useEffect } from 'react';
import { Button, Alert, Form } from 'react-bootstrap';
import { Navigate, useLocation } from 'react-router-dom';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';

// actions
import { resetAuth, loginUser, getRolesListActions } from '../../redux/actions';

// components
import { VerticalForm, FormInput } from '../../components/';
import AccountLayout from './AccountLayout';
import { useForm } from 'react-hook-form';
import { ButtonLoading } from '../../helpers/loader/Loading';

const Login = (): React$Element<any> => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const location = useLocation();
    const redirectUrl = location.state?.from?.pathname || '/';

    const { rolesList } = useSelector((state) => state.rolesListReducer || {});
    const RolesData = rolesList?.response || [];

    const { loading, userLoggedIn, user, error } = useSelector((state) => ({
        loading: state.Auth.loading,
        user: state.Auth.user,
        error: state.Auth.error,
        userLoggedIn: state.Auth.userLoggedIn,
    }));

    useEffect(() => {
        dispatch(getRolesListActions());
    }, [dispatch]);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(
            yup.object().shape({
                // role: yup.string().required(t('Please select a role')),
                email: yup.string().required(t('Please enter email')),
                password: yup.string().required(t('Please enter Password')),
            })
        ),
    });

    const onSubmit = (data) => {
        console.log('Submitted:', data);
        const payload={
            ...data,
            fireBaseId:''
        }
        dispatch(loginUser(payload));
    };

    return (
        <>
            {(userLoggedIn || user) && <Navigate to={redirectUrl} replace />}

            <AccountLayout>
                <div className="text-center w-75 m-auto">
                    <h4 className="text-dark-50 text-center mt-0 fw-bold">{t('Log In')}</h4>
                    <p className="text-muted mb-4">
                        {t('Enter your email address and password to access admin panel.')}
                    </p>
                </div>

                {error && (
                    <Alert variant="danger" className="my-2">
                        {error}
                    </Alert>
                )}

                <form onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="mb-3" controlId="role">
                        <Form.Label>{t('Role')}</Form.Label>
                        <Form.Select {...register('roleId')} defaultValue="">
                            <option value="" disabled>
                                {t('Select Role')}
                            </option>
                            {RolesData.map((role) => (
                                <option key={role._id} value={role._id} className='text-capitalize'>
                                    {role.name}
                                </option>
                            ))}
                        </Form.Select>
                        {errors.role && (
                            <div className="text-danger mt-1">{errors.role.message}</div>
                        )}
                    </Form.Group>

                    <FormInput
                        label={t('Email')}
                        type="text"
                        name="email"
                        register={register}
                        error={errors.email}
                        placeholder={t('Enter your email')}
                        containerClass="mb-3"
                    />

                    <FormInput
                        label={t('Password')}
                        type="password"
                        name="password"
                        register={register}
                        error={errors.password}
                        placeholder={t('Enter your password')}
                        containerClass="mb-3"
                    />

                    <div className="mb-3 mb-0 text-center">
                        <Button variant="primary" type="submit" disabled={loading}>
                            {!loading ? t('Log In') : <ButtonLoading />}
                        </Button>
                    </div>
                </form>
            </AccountLayout>
        </>
    );
};

export default Login;
