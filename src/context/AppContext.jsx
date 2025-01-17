import React, { useState } from 'react'
import { CurrentUserHolder } from '../context/CurrentUserContext';
import { PageTypeHolder } from '../context/PageTypeContext';
import { DebtContextHolder } from '../context/DebtContext';
import { SearchHolder } from '../context/SearchContext';
import { UserContextHolder } from '../context/UserContext';
import { VariableHolder } from '../context/VariableContext';
import AppRoutes from '../routes/AppRoutes';
import Navbar from '../NavBar';
import Footer from '../Footer';
import { PaymentContextHolder } from './PaymentContext';
import { CacheContextHolder } from './CachedDataContext';

export default function AppContext() {
    return (
      <CurrentUserHolder>
        <CacheContextHolder>
        <PageTypeHolder>
          <DebtContextHolder>
            <PaymentContextHolder>
            <SearchHolder>
              <UserContextHolder>
                <VariableHolder>
                    <Navbar />
                    <AppRoutes />
                    <Footer/>
                </VariableHolder>
              </UserContextHolder>
            </SearchHolder>
            </PaymentContextHolder>
          </DebtContextHolder>
        </PageTypeHolder>
        </CacheContextHolder>
      </CurrentUserHolder>
  )
}
