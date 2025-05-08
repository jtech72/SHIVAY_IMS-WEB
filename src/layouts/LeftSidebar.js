// @flow
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import classNames from 'classnames';

import { getMenuItems } from '../helpers/menu';

// components
import AppMenu from './Menu';

// images
import { Logo, Shivay_Logo, } from '../helpers/image';
import LogoutModal from '../pages/account/LogoutModal';

type SideBarContentProps = {
    hideUserProfile: boolean,
};

/* sidebar content */
const SideBarContent = ({ hideUserProfile }: SideBarContentProps) => {
    return (
        <>
            {!hideUserProfile && (
                <div className="leftbar-user">
                    <Link to="/">
                        {/* <img src={} alt="" height="42" className="rounded-circle shadow-sm" /> */}
                        <span className="leftbar-user-name">Dominic Keller</span>
                    </Link>
                </div>
            )}
            <AppMenu menuItems={getMenuItems()} />

            <div className="clearfix" />
        </>
    );
};

type LeftSidebarProps = {
    hideLogo: boolean,
    hideUserProfile: boolean,
    isLight: boolean,
    isCondensed: boolean,
};

const LeftSidebar = ({ isCondensed, isLight, hideLogo, hideUserProfile }: LeftSidebarProps): React$Element<any> => {
    const menuNodeRef: any = useRef(null);

    const navigate = useNavigate();
    /**
     * Handle the click anywhere in doc
     */
    const handleOtherClick = (e: any) => {
        if (menuNodeRef && menuNodeRef.current && menuNodeRef.current.contains(e.target)) return;
        // else hide the menubar
        if (document.body) {
            document.body.classList.remove('sidebar-enable');
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleOtherClick, false);

        return () => {
            document.removeEventListener('mousedown', handleOtherClick, false);
        };
    }, []);

    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const MENU_ITEMS_END = [

        {
            label: 'Help & Support',
            icon: "mdi-help-circle-outline",
            redirectTo: "#",
        },
        {
            label: 'Privacy Policy',
            icon: "mdi-shield-lock-outline",
            redirectTo: "#",
            // url: "/dashboard/account",
        },
        {
            label: 'Terms & Conditions',
            icon: "mdi-file-document-edit-outline",
            redirectTo: "#",
        },
        {
            key: 'logout',
            label: 'Logout',
            icon: 'mdi-logout',
            // url: '/account/logout',
        },
    ];

    const handleCheckLogout = (data) => {
        if (data === 'Logout') {
            setShowLogoutModal(true);
        }
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        navigate('/account/logout')
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };


    return (
        <>
            <div className="leftside-menu" ref={menuNodeRef}>


                {!hideLogo && (
                    <>
                        <Link to="/" className="logo text-center logo-light">
                            <span className="logo-lg">
                                <img src={isLight ? Shivay_Logo : Shivay_Logo} alt="logo" height="60" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? Shivay_Logo : Shivay_Logo} alt="logo" height="50" />
                            </span>
                        </Link>

                        <Link to="/" className="logo text-center logo-dark">
                            <span className="logo-lg">
                                <img src={isLight ? Shivay_Logo : Shivay_Logo} alt="logo" height="60" />
                            </span>
                            <span className="logo-sm">
                                <img src={isLight ? Shivay_Logo : Shivay_Logo} alt="logo" height="50" />
                            </span>
                        </Link>
                    </>
                )}

                <div className="d-flex flex-column h-100 mt-2">
                    {/* Sidebar content (main scrollable area) */}
                    <div className="flex-grow-1 overflow-hidden">
                        {!isCondensed ? (
                            <SimpleBar style={{ maxHeight: '100%' }} timeout={500} scrollbarMaxSize={320}>
                                <SideBarContent
                                    menuClickHandler={() => { }}
                                    isLight={isLight}
                                    hideUserProfile={hideUserProfile}
                                />
                            </SimpleBar>
                        ) : (
                            <SideBarContent isLight={isLight} hideUserProfile={hideUserProfile} />
                        )}
                    </div>

                    {/* Bottom fixed content */}
                    <div className="pt-2 border-top">
                        {MENU_ITEMS_END.map((ele, index) => {
                            const isLogout = ele.label === 'Logout';

                            return (
                                <div className='' key={index}>
                                    {isCondensed ? (
                                        <button
                                            onClick={() => isLogout ? handleCheckLogout(ele.label) : navigate(ele.redirectTo)}
                                            className="px-3 py-2 w-100 d-flex justify-content-center align-items-center bg-transparent border-0"
                                        >
                                            <span
                                                className={`${ele.icon?.startsWith('mdi') ? 'mdi' : ''} ${ele.icon} mdi-18px textLeftSidebar`}
                                            ></span>
                                        </button>
                                    ) : (
                                        <div className="info-color px-2 py-1 align-items-center">
                                            <button
                                                data-toggle={['Tasks', 'Billing', 'Help & Support'].includes(ele.label) ? "tooltip" : ''}
                                                data-placement="top"
                                                title={['Tasks', 'Billing', 'Help & Support'].includes(ele.label) ? "In Progress" : ''}
                                                onClick={() => isLogout ? handleCheckLogout(ele.label) : navigate(ele.redirectTo)}
                                                className="px-2 textLeftSidebar bg-transparent border-0"
                                            >
                                                <span className={`mdi ${ele.icon} mdi-18px px-1 iconsLeftSidebar`}></span>
                                                <span className="px-2 sidebar_listItems notranslate">{ele.label}</span>
                                            </button>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>

                <LogoutModal
                    show={showLogoutModal}
                    onConfirm={handleLogoutConfirm}
                    onCancel={handleLogoutCancel}
                />
            </div>

        </>
    );
};

LeftSidebar.defaultProps = {
    hideLogo: false,
    hideUserProfile: false,
    isLight: false,
    isCondensed: false,
};

export default LeftSidebar;
