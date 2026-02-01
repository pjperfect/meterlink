import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  MessageSquare,
  History,
  BarChart3,
  Menu,
  X,
} from 'lucide-react';

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/input', label: 'SMS Input', icon: MessageSquare },
  { to: '/history', label: 'Usage History', icon: History },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
];

function AppLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const closeMobile = () => setMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="lg:hidden bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="flex items-center justify-between px-4 py-4">
          <NavLink
            to="/"
            onClick={closeMobile}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/MeterLink.png"
              alt="MeterLink Logo"
              className="h-8 w-auto object-contain shrink-0"
            />
            <h1 className="text-lg font-semibold text-gray-900">MeterLink</h1>
          </NavLink>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      <header className="hidden lg:block bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <NavLink
            to="/"
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <img
              src="/MeterLink.png"
              alt="MeterLink Logo"
              className="h-10 w-auto object-contain shrink-0"
            />
            <h1 className="text-xl font-semibold text-gray-900">MeterLink</h1>
          </NavLink>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto">
        <nav className="hidden lg:block w-64 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] p-6">
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="size-5" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {mobileMenuOpen && (
          <>
            <div
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={closeMobile}
            />

            <div className="lg:hidden fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    src="/MeterLink.png"
                    alt="MeterLink Logo"
                    className="h-8 w-auto object-contain shrink-0"
                  />
                  <h2 className="text-lg font-semibold text-gray-900">
                    MeterLink
                  </h2>
                </div>
                <button
                  onClick={closeMobile}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="flex-1 p-4">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={item.end}
                        onClick={closeMobile}
                        className={({ isActive }) =>
                          `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? 'bg-blue-50 text-blue-600'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`
                        }
                      >
                        <item.icon className="size-5" />
                        <span className="font-medium">{item.label}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </>
        )}

        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AppLayout;
