import React,{useState,useEffect} from "react";
import { useParams } from "react-router-dom";

export default function DsaTopic() {
  const { topic } = useParams();

    


  return <div>{topic}</div>;
}