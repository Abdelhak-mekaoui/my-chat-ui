'use client'
import React from 'react';
import { RecoilRoot } from 'recoil'

type RecoilProviderProps = {
  children: React.ReactNode;
};

const RecoilProvider: React.FC<RecoilProviderProps> = ({ children }) => {
  return (
    <RecoilRoot >
      {children}
    </RecoilRoot>
  );
};

export default RecoilProvider;
