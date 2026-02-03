
import React , {useState , useEffect} from 'react'
import axios from "axios";
export default function Data() {
const API_KEY = "54332000-1bc14590cbe1707edfe1f2579";

axios.get("https://pixabay.com/api/", {
  params: {
    key: API_KEY
    // q: "nature",
    // image_type: "photo",
    // per_page: 12,
  },
})
.then(res => {
  console.log(res.data.hits); // images array
})
.catch(err => {
  console.error(err);
});
  return (
    []
  )
}
