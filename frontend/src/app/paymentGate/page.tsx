"use client"

import { getSessionData } from "./sessionData";
import type {sessionData} from "./sessionData"
import { HomeNavBar } from "../homepage/components/HomeNavBar";
import { useState, useEffect } from "react";
import { sendData } from "./paymentServer"
import { Button } from "@/components/ui/button";
import {useRouter} from "next/navigation";

export default function PaymentGateway() {
  const data: sessionData = getSessionData();
  const [isLoading, setIsLoading] = useState(true);
const router = useRouter();
  useEffect(() => {
    let timer: NodeJS.Timeout
    
    sendData()
      .then(() => {
        timer = setTimeout(
          () => {
            setIsLoading(false)
          },
          1000 + Math.random() * 1500
        );
      })
      .catch(error => console.error(error));

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <HomeNavBar />
      <div style={{ fontSize: 20, fontWeight: 500, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)"}}>Please wait while we process your payment</div>

        <div style={{
          display: "flex",
          top: "calc(50% + 65px)",
          left: "50%",
          width: "200px",
          height: "50px",
          transform: "translate(-50%, -50%)",
          position: "absolute",
          justifyContent: "center ",
        }}>
          {isLoading
            ? <LoadingDots />
            : <Button
            
            onClick={() => {
              
              router.push("../account/history");
            }}
            style = {{width: "100%",
            height: "100%",
            }}>
              Next
            </Button>
          }
        </div>
    </>
  );
}

function LoadingDots() {
  return (
    <div style={{ display: "flex", gap: 8 }}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            backgroundColor: "currentColor",
            animation: "bounce 1s infinite",
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <style>{`
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
          40% { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}