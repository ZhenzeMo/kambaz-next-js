"use client";
import React from "react";
import { usePathname } from "next/navigation";
export default function Breadcrumb({ course }: { course: { name: string } | undefined; }) {
 const pathname = usePathname();
 
 // Get the current page name from the path
 const getCurrentPage = () => {
   const pathParts = pathname.split("/");
   const currentPage = pathParts[pathParts.length - 1];
   
   // Map page names to display names
   const pageMap: { [key: string]: string } = {
     'Home': 'Home',
     'Modules': 'Modules', 
     'Assignments': 'Assignments',
     'Quizzes': 'Quizzes',
     'Grades': 'Grades',
     'People': 'People',
     'Table': 'People', // Handle People/Table case
     'Calendar': 'Calendar',
     'Inbox': 'Inbox'
   };
   
   return pageMap[currentPage] || currentPage;
 };
 
 return (
   <span>
     <span className="text-danger">{course?.name}</span> &gt; <span className="text-dark" style={{fontSize: '0.9em', fontWeight: 'normal'}}>{getCurrentPage()}</span>
   </span>
 );}
