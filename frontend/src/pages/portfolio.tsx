import React, { useState } from 'react';

const Portfolio: React.FC = () => {
  // State variables for personal info (editable fields)
  const [firstName, setFirstName] = useState('Chloe');
  const [lastName, setLastName] = useState('Ren');
  const [gender, setGender] = useState('Female');
  const [age, setAge] = useState(12);
  const [school, setSchool] = useState('ABC Primary School');
  const [previousEvents, setPreviousEvents] = useState(['1. Art Basel Hong Kong', '2. Hong Kong Arts Festival', '3. Art Central', '4. HKwalls Street Art Festival']);
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [parentsAccountConnected, setParentsAccountConnected] = useState('No');

  // State to handle the edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Temporary state to store changes before saving
  const [tempFirstName, setTempFirstName] = useState(firstName);
  const [tempLastName, setTempLastName] = useState(lastName);
  const [tempGender, setTempGender] = useState(gender);
  const [tempAge, setTempAge] = useState(age);
  const [tempSchool, setTempSchool] = useState(school);
  const [tempPreferredLanguage, setTempPreferredLanguage] = useState(preferredLanguage);

  // Toggle edit mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  // Save changes
  const saveChanges = () => {
    setFirstName(tempFirstName);
    setLastName(tempLastName);
    setGender(tempGender);
    setAge(tempAge);
    setSchool(tempSchool);
    setPreferredLanguage(tempPreferredLanguage);
    setIsEditing(false);
  };

  // Cancel changes
  const cancelChanges = () => {
    setTempFirstName(firstName);
    setTempLastName(lastName);
    setTempGender(gender);
    setTempAge(age);
    setTempSchool(school);
    setTempPreferredLanguage(preferredLanguage);
    setIsEditing(false);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <h1 style={styles.title}>My Learning Profile</h1>
        <div style={styles.iconContainer}>
          <div style={styles.iconPlaceholder}>
            <p>Insert your icon</p>
          </div>
        </div>
      </div>

      {/* Personal Information */}
      <div style={styles.infoCard}>
        <h2 style={styles.sectionTitle}>Personal Information</h2>

        {/* Editable fields */}
        <div style={styles.infoRow}>
          <p style={styles.label}>First name</p>
          {isEditing ? (
            <input
              type="text"
              value={tempFirstName}
              onChange={(e) => setTempFirstName(e.target.value)}
              style={styles.input}
            />
          ) : (
            <p style={styles.value}>{firstName}</p>
          )}
        </div>

        <div style={styles.infoRow}>
          <p style={styles.label}>Last name</p>
          {isEditing ? (
            <input
              type="text"
              value={tempLastName}
              onChange={(e) => setTempLastName(e.target.value)}
              style={styles.input}
            />
          ) : (
            <p style={styles.value}>{lastName}</p>
          )}
        </div>

        <div style={styles.infoRow}>
          <p style={styles.label}>Gender and Age</p>
          {isEditing ? (
            <div style={styles.inlineInput}>
              <input
                type="text"
                value={tempGender}
                onChange={(e) => setTempGender(e.target.value)}
                style={styles.inputSmall}
              />
              <input
                type="number"
                value={tempAge}
                onChange={(e) => setTempAge(parseInt(e.target.value))}
                style={styles.inputSmall}
              />
            </div>
          ) : (
            <p style={styles.value}>{`${gender}, ${age}`}</p>
          )}
        </div>

        <div style={styles.infoRow}>
          <p style={styles.label}>School or Organisation</p>
          {isEditing ? (
            <input
              type="text"
              value={tempSchool}
              onChange={(e) => setTempSchool(e.target.value)}
              style={styles.input}
            />
          ) : (
            <p style={styles.value}>{school}</p>
          )}
        </div>

        <div style={styles.infoRow}>
          <p style={styles.label}>Previous Event Records</p>
          <ul style={styles.list}>
            {previousEvents.map((event, index) => (
              <li key={index} style={styles.value}>{event}</li>
            ))}
          </ul>
        </div>

        <div style={styles.infoRow}>
          <p style={styles.label}>Prefer Language</p>
          {isEditing ? (
            <input
              type="text"
              value={tempPreferredLanguage}
              onChange={(e) => setTempPreferredLanguage(e.target.value)}
              style={styles.input}
            />
          ) : (
            <p style={styles.value}>{preferredLanguage}</p>
          )}
        </div>

        <div style={styles.infoRow}>
          <p style={styles.label}>Parents Account Connected</p>
          <p style={styles.value}>{parentsAccountConnected}</p>
        </div>

        {/* Edit/Save buttons */}
        {isEditing ? (
          <div style={styles.buttonContainer}>
            <button onClick={saveChanges} style={styles.saveButton}>Save</button>
            <button onClick={cancelChanges} style={styles.cancelButton}>Cancel</button>
          </div>
        ) : (
          <button onClick={toggleEditMode} style={styles.editButton}>Edit</button>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  iconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    width: '70px',
    height: '70px',
    border: '2px solid #ccc',
  },
  iconPlaceholder: {
    textAlign: 'center',
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  sectionTitle: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  infoRow: {
    display: 'flex',
    flexDirection: 'column',  // Stack items vertically
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
    marginBottom: '15px',
  },
  label: {
    color: '#888',
    fontSize: '14px',
    marginBottom: '5px',
  },
  value: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  input: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  inputSmall: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '45%',
    marginRight: '10px',
  },
  inlineInput: {
    display: 'flex',
    gap: '10px',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  editButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  saveButton: {
    padding: '10px 20px',
    backgroundColor: 'green',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  cancelButton: {
    padding: '10px 20px',
    backgroundColor: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Portfolio;