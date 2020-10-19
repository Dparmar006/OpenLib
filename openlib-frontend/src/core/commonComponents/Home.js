import React, { useEffect, useState } from "react";
import { getAllBooks } from "../books/helper/coreApiCalls";
import Base from "./Base";

export default function Home() {
  return (
    <div>
      <Base></Base>
    </div>
  );
}
