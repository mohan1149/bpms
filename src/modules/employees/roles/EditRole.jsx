import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { Button } from 'primereact/button';
import { updateRole } from '../../../apis/services';
import { getTimeStamp } from '../../../helpers/helpers';
import { Toast } from 'primereact/toast';
import { Checkbox } from 'primereact/checkbox';

const EditRole = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const role = JSON.parse(location.state);
    const toast = useRef();
    const [roleName, setRoleName] = useState(role.role_title);
    const [roleDesc, setRoleDesc] = useState(role.role_desc);
    const [rolePerms, setRolePerms] = useState(JSON.parse(role.role_perms));
    const [permGroup, setPermGroup] = useState([]);
    const [status, setStatus] = useState(role.status === 1 ? true : false);
    const togglePermissions = (e) => {
        let perms = [...rolePerms];
        if (e.checked)
            perms.push(e.value);
        else
            perms.splice(perms.indexOf(e.value), 1);
        setRolePerms(perms);

    }
    const toggleGroupPermissions = (e) => {
        let perms = [...permGroup];
        if (e.checked)
            perms.push(e.value);
        else
            perms.splice(perms.indexOf(e.value), 1);
        setPermGroup(perms);

    }
    const handleEditRole = async () => {
        try {
            let data = {
                id:role.id,
                roleTitle: roleName,
                roleDesc: roleDesc,
                rolePerms: JSON.stringify(rolePerms),
                updated_at: getTimeStamp(new Date()),
                status: status,
            };
            const res = await updateRole(data);

            if (res.data.status) {
                console.log(toast);

                toast.current.show({ severity: 'success', summary: t('success'), detail: t(res.data.message), life: 3000 });
            } else {
                toast.current.show({ severity: 'error', summary: t('error'), detail: t(res.data.message), life: 3000 });
            }
        } catch (error) {

        }
    }


    let permissions = [
        {
            group_name: 'manage_branches',
            permissions: [
                {
                    perm: 'manage_branches',
                },
                {
                    perm: "add_edit_view_branches",
                },
                {
                    perm: "delete_branch",
                }
            ],
        },
        {
            group_name: 'manage_emps',
            permissions: [
                {
                    perm: 'manage_roles',
                },
                {
                    perm: 'manage_emps',
                },
                {
                    perm: "add_edit_view_emp",
                },
                {
                    perm: "delete_emp",
                }
            ],
        },
        {
            group_name: 'manage_customer_groups',
            permissions: [
                {
                    perm: 'manage_customer_groups',
                },
                {
                    perm: "add_edit_view_customer_groups",
                },
                {
                    perm: "delete_customer_group",
                }
            ],
        },
        {
            group_name: 'manage_customers',
            permissions: [
                {
                    perm: 'manage_customers',
                },
                {
                    perm: "add_edit_view_customers",
                },
                {
                    perm: "delete_customer",
                }
            ],
        },

        {
            group_name: 'manage_services',
            permissions: [
                {
                    perm: 'manage_services',
                },
                {
                    perm: "add_edit_view_services",
                },
                {
                    perm: "delete_services",
                }
            ],
        },
        {
            group_name: 'manage_service_categories',
            permissions: [
                {
                    perm: 'manage_service_categories',
                },
                {
                    perm: "add_edit_view_service_categories",
                },
                {
                    perm: "delete_service_categories",
                }
            ],
        },
        {
            group_name: 'manage_service_variations',
            permissions: [
                {
                    perm: 'manage_service_variations',
                },
                {
                    perm: "add_edit_view_service_variations",
                },
                {
                    perm: "delete_service_variations",
                }
            ],
        },
        {
            group_name: 'manage_service_modifiers',
            permissions: [
                {
                    perm: 'manage_service_modifiers',
                },
                {
                    perm: "add_edit_view_service_modifiers",
                },
                {
                    perm: "delete_service_modifiers",
                }
            ],
        },
        {
            group_name: 'service_terminal',
            permissions: [
                {
                    perm: 'service_terminal',
                },
                {
                    perm: "edit_view_service_orders",
                },
                {
                    perm: "delete_service_order",
                }
            ],
        },
        {
            group_name: 'manage_bookings',
            permissions: [
                {
                    perm: 'manage_bookings',
                },
                {
                    perm: "add_edit_view_bookings",
                },
                {
                    perm: "cancel_bookings",
                },
                {
                    perm: "delete_bookings",
                }
            ],
        },
        {
            group_name: 'manage_settings',
            permissions: [
                {
                    perm: "account_payments"
                },
                {
                    perm: 'payment_types',
                },
                {
                    perm: "manage_taxes",
                },
                {
                    perm: "invoice_layouts",
                }
            ],
        },
        {
            group_name: 'reports',
            permissions: [
                {
                    perm: 'service_reports',
                },
                {
                    perm: "customer_reports",
                },
                {
                    perm: "bookings_report",
                },
                {
                    perm: "employee_report",
                },
                {
                    perm: 'branch_reports'
                }
            ],
        },
    ];
    return (
        <div className="p-3 glass-card">
            <Toast ref={toast} />
            <div className="d-flex jcsb">
                <div className='mt-2 mb-2'>
                    <h4>{t('edit_role')}</h4>
                </div>
                <div className='p-2'>
                    <Link to='/employees/roles' className="link-btn">
                        {t('back')}
                    </Link>
                </div>
            </div>
            <div className="p-3">
                <form action=""
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleEditRole();
                    }}
                >
                    <div className="row">
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <label htmlFor="role_name" className='mb-1 required'>{t('role_name')}</label>
                                <input type="text" className='form-control' required id="role_name"
                                    value={roleName}
                                    onChange={(e) => {
                                        setRoleName(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-6 mb-2">
                            <div className="form-group">
                                <label htmlFor="role_desc" className='mb-1 required'>{t('role_desc')}</label>
                                <input type="text" className='form-control' required id="role_desc"
                                    value={roleDesc}
                                    onChange={(e) => {
                                        setRoleDesc(e.target.value);
                                    }}
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <h5 className='opacity mt-2 pb-2'>{t('allowed_permissions')}</h5>
                            <div className="d-flex flex-wrap mt-2">
                                {
                                    permissions.map((r, index) => {
                                        return (
                                            <div className="mb-2" key={index}>
                                                {/* <Checkbox
                                                    inputId={r.group_name}
                                                    name={r.group_name}
                                                    value={r.group_name}
                                                    onChange={toggleGroupPermissions} checked={permGroup.includes(r.group_name)}
                                                />
                                                <label htmlFor={r.group_name} className="mx-2"
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: '1rem'
                                                    }}
                                                >
                                                    {t(r.group_name)}
                                                </label> */}
                                                <h6><strong>{t(r.group_name)}</strong></h6>

                                                {
                                                    r.permissions.map((e, i) => {
                                                        return (
                                                            <div
                                                                key={i}
                                                                // className='mb-2 mx-4'
                                                                className='mb-2'
                                                            >
                                                                <Checkbox inputId={e.perm} name={e.perm} value={e.perm}
                                                                    onChange={togglePermissions} checked={rolePerms.includes(e.perm)}
                                                                />
                                                                <label htmlFor={e.perm} className="mx-2">{t(e.perm)}</label>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </div>
                        <div className="col-md-12 mt-2">
                            <div className="d-flex">
                                <div className="flex align-items-center">
                                    <Checkbox inputId="status" name="status" checked={status} className='mx-1'
                                        onChange={() => {
                                            setStatus(!status);
                                        }}
                                    />
                                    <label htmlFor="status" className="ml-2">{t('enable_for_use')}</label>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12 mt-4">
                            <Button type='submit' className='p-btn' label={t('update_role')} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditRole;