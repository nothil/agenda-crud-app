import React from "react";
import { jsPDF } from "jspdf";

const Download = () => {
  const doc = new jsPDF("portrait", "px", "a4", "false");

  doc.table();
};

export default Download;
