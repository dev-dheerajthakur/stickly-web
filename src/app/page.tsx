"use client"
import Link from 'next/link'
import React, { useRef, useState } from 'react'

import styles from './page.module.css'
import { useRouter } from 'next/navigation';
import AllChats from '@/components/AllChats';

export default function page() {
  const [inputValue, setInputValue] = useState<string>("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    const filtered = event.target.value.replace(/[^a-zA-Z0-9_! ]/g, "");
    setInputValue(filtered);
  };

  function toggleDialog() {
    if (dialogRef.current) {
      dialogRef.current.open ? dialogRef.current.close() : dialogRef.current.showModal();
    }
  };

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const roomId = inputValue?.replaceAll(" ", "");
    if (!roomId) {
      alert("room id required!!");
      return;
    };
    router.push(`/room/${roomId}`)
  };

  return (
    <div className={styles.container}>
      <dialog className={styles.dialog} ref={dialogRef}>
        <form onSubmit={handleSubmit} className={styles.dialogContent}>
          <label className={styles.label} htmlFor="roomId">Room ID:</label>
          <input placeholder='Create room id' className={styles.input} name='roomId' type="text" onChange={handleInputChange} value={inputValue}/>
          <div className={styles.buttonContainer}>
            <button onClick={toggleDialog} className={`${styles.submitButton} ${styles.dialogButton}`}>Cancel</button>
            <button type='submit' className={`${styles.submitButton} ${styles.dialogButton}`}>Submit</button>
          </div>
        </form>
      </dialog>
      <button className={styles.dialogButton} onClick={toggleDialog}>Create Room</button>
      <Link href="/room/1" className={styles.link}>Go to Room 1</Link>
      <AllChats />
    </div>
  )
}















