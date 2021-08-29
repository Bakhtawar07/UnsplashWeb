import React from 'react'
import Header from './Header'
import styles from '../styles/layout.module.css'
import Nav from './Nav'
import Head from 'next/head'

const Layout = ({children}) => {
    return (
        <>
        <Nav/>
        <div className={styles.container}>
            <main className={styles.main}>
            <Header/>
                {children}
          
            </main>
            
        </div>
        </>
    )
}

export default Layout
