import React from 'react'
import { NavLink } from 'react-router-dom';
export const Header = () => {
  return (
    <div className="container-fluid">
      <div className="d-flex">
        <NavLink to="/" className="header-brand">
          <img src="./img/main-logo-2.png" className="header-brand-img" alt="tabler logo" />
        </NavLink>
        <div className="d-flex order-lg-2 ml-auto">
          <div className="dropdown d-none d-md-flex">
            <a className="nav-link icon" data-toggle="dropdown">
              <i className="fa fa-bell"></i>
              <span className="nav-unread"></span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
              <a href="#" className="dropdown-item d-flex">
                <span className="avatar mr-3 align-self-center" style={{ backgroundImage: 'url(demo/faces/male/41.jpg)' }}></span>
                <div>
                  <strong>Nathan</strong> pushed new commit: Fix page load performance issue.
                  <div className="small text-muted">10 minutes ago</div>
                </div>
              </a>
              <a href="#" className="dropdown-item d-flex">
                <span className="avatar mr-3 align-self-center" style={{ backgroundImage: 'url(demo/faces/female/1.jpg)' }}></span>
                <div>
                  <strong>Alice</strong> started new task: Tabler UI design.
                  <div className="small text-muted">1 hour ago</div>
                </div>
              </a>
              <a href="#" className="dropdown-item d-flex">
                <span className="avatar mr-3 align-self-center" style={{ backgroundImage: 'url(demo/faces/female/18.jpg)' }}></span>
                <div>
                  <strong>Rose</strong> deployed new version of NodeJS REST Api V3
                  <div className="small text-muted">2 hours ago</div>
                </div>
              </a>
              <div className="dropdown-divider"></div>
              <a href="#" className="dropdown-item text-center text-muted-dark">Mark all as read</a>
            </div>
          </div>
          <div className="dropdown">
            <a href="#" className="nav-link pr-0 leading-none" data-toggle="dropdown">
              <span className="avatar" style={{ backgroundImage: 'url(./demo/faces/female/25.jpg)' }}></span>
              <span className="ml-2 d-none d-lg-block">
                <span className="text-default">Jane Pearson</span>
                <small className="text-muted d-block mt-1">Administrator</small>
              </span>
            </a>
            <div className="dropdown-menu dropdown-menu-right dropdown-menu-arrow">
              <a className="dropdown-item" href="#">
                <i className="dropdown-icon fa fa-user"></i> Profile
              </a>
              <a className="dropdown-item" href="#">
                <i className="dropdown-icon fa fa-settings"></i> Settings
              </a>
              <a className="dropdown-item" href="#">
                <span className="float-right"><span className="badge badge-primary">6</span></span>
                <i className="dropdown-icon fa fa-mail"></i> Inbox
              </a>
              <a className="dropdown-item" href="#">
                <i className="dropdown-icon fa fa-send"></i> Message
              </a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">
                <i className="dropdown-icon fa fa-help-circle"></i> Need help?
              </a>
              <a className="dropdown-item" href="#">
                <i className="dropdown-icon fa fa-log-out"></i> Sign out
              </a>
            </div>
          </div>
        </div>
        <a href="#" className="header-toggler d-lg-none ml-3 ml-lg-0" data-toggle="collapse" data-target="#headerMenuCollapse">
          <span className="header-toggler-icon"></span>
        </a>
      </div>
    </div>
  );
};

export default Header;
