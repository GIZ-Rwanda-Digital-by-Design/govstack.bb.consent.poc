import React from "react";
import { Dropdown } from "antd";
import companyLogo from 'assets/icons/iGrant_logo.png';

const LOGO_WIDTH = 100;
const LOGO_HEIGHT = 27;

export const Logo = () => (
  <div className="app-watermark">
    <img
      src={companyLogo}
      style={{ width: LOGO_WIDTH, height: LOGO_HEIGHT }}
      alt="company-logo"
    />
  </div>
);
