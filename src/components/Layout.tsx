import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { LogOut, ShoppingCart, User as UserIcon, Package, History } from 'lucide-react';

export default function Layout() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-indigo-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-xl font-bold">
                B2B Orders
              </Link>
              {user && (
                <div className="hidden md:flex space-x-4">
                  {user.admin ? (
                    <>
                      <Link to="/admin/articles" className="hover:text-indigo-200 flex items-center gap-2">
                        <Package size={20} />
                        Articles
                      </Link>
                      <Link to="/admin/clients" className="hover:text-indigo-200 flex items-center gap-2">
                        <UserIcon size={20} />
                        Clients
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/catalog" className="hover:text-indigo-200 flex items-center gap-2">
                        <Package size={20} />
                        Catalog
                      </Link>
                      <Link to="/cart" className="hover:text-indigo-200 flex items-center gap-2">
                        <ShoppingCart size={20} />
                        Cart
                      </Link>
                      <Link to="/orders" className="hover:text-indigo-200 flex items-center gap-2">
                        <History size={20} />
                        Orders
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
            {user && (
              <div className="flex items-center space-x-4">
                <span className="text-sm">{user.login}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <LogOut size={20} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
}