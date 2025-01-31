import React from 'react';

function UserDetails() {
  const name = "Jithender";
  const registrationNumber = "23CB022";
  const branch = "Computer Science & Bussiness System";
  const year = "2023-2027";
  const cgpa = "7.6";
  const attendance = "76%";
  const skillslist = ["JavaScript", "React", "Node.js", "Python"];
  const expertiselist = ["Web Development", "Content Creation"];
  const leetcode = "jithender_leetcode";            
  const codechef = "jithender_codechef";
  const codeforce = "jithender_codeforce";
  const certificatesList = ["Promotion Certificate", "Zee Tamizh Campaign"];
  const projectsList = ["Portfolio Website", "Education Tracker"];
  const papersList = ["Content Creation", "Virtual Reality"];
  const awardsList = ["Influencer of 2024", "Best Content Creator"]; 

  return (
    <div className="details-container">
      <div className="detail-group">
        <h2>{name}</h2>
        <h4>Registration No</h4>
        <p>{registrationNumber}</p>
        <h4>Roll No</h4>
        <p>22CB022</p>
      </div>
      <div className="detail-group">
        <h4>Branch:</h4>
        <p>{branch}</p>
        <h4>Year:</h4>
        <p>{year}</p>
      </div>
      <div className="detail-group">
        <h4>CGPA:</h4>
        <p>{cgpa}</p>
        <h4>Attendance:</h4>
        <p>{attendance}</p>
      </div>
      <div className="detail-group">
        <h4>Skills:</h4>
        <ul>
          {skillslist.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
      </div>
      <div className="detail-group">
        <h4>Expertise:</h4>
        <ul>
          {expertiselist.map((expertise, index) => (
            <li key={index}>{expertise}</li>
          ))}
        </ul>
      </div>
      <div className="detail-group">
        <h4>Leetcode:</h4>
        <p>{leetcode}</p>
      </div>
      <div className="detail-group">
        <h4>Codechef:</h4>
        <p>{codechef}</p>
      </div>
      <div className="detail-group">
        <h4>Codeforce:</h4>
        <p>{codeforce}</p>
      </div>
      <div className="detail-group">
        <h4>Certificates:</h4>
        <ul>
          {certificatesList.map((certificate, index) => (
            <li key={index}>{certificate}</li>
          ))}
        </ul>
      </div>
      <div className="detail-group">
        <h4>Projects:</h4>
        <ul>
          {projectsList.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>
      <div className="detail-group">
        <h4>Papers:</h4>
        <ul>
          {papersList.map((paper, index) => (
            <li key={index}>{paper}</li>
          ))}
        </ul>
      </div>
      <div className="detail-group">
        <h4>Awards:</h4>
        <ul>
          {awardsList.map((award, index) => (
            <li key={index}>{award}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserDetails;
