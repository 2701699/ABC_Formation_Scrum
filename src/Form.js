import React, { useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Button, Form as BootstrapForm, FormGroup, FormLabel, FormControl } from 'react-bootstrap';
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Form = () => {
  const form = useRef(null);
  const [formData, setFormData] = useState({
    employeeName: '',
    managerName: '',
    thirdPartyProvider: '',
    courseCode: '',
    courseTitle: '',
    registrationDeadline: new Date(),
    category: '',
    teachingMode: '',
    courseLanguage: '',
    courseDuration: '',
    courseFees: '',
    courseStartDate: new Date(),
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.employeeName) newErrors.employeeName = 'Nom de l\'employé.e est requis.';
    if (!formData.managerName) newErrors.managerName = 'Nom du gestionnaire est requis.';
    if (!formData.thirdPartyProvider) newErrors.thirdPartyProvider = 'Fournisseur tierce partie est requis.';
    if (!formData.courseCode) newErrors.courseCode = 'Code du cours est requis.';
    if (!formData.courseTitle) newErrors.courseTitle = 'Titre du cours est requis.';
    if (!formData.category) newErrors.category = 'Catégorie est requise.';
    if (!formData.teachingMode) newErrors.teachingMode = 'Modalité pédagogique est requise.';
    if (!formData.courseLanguage) newErrors.courseLanguage = 'Langue du cours est requise.';
    if (!formData.courseDuration || isNaN(Number(formData.courseDuration))) newErrors.courseDuration = 'Durée du cours doit être un nombre valide.';
    if (!formData.courseFees || isNaN(Number(formData.courseFees))) newErrors.courseFees = 'Frais du cours doivent être un nombre valide.';
    if (formData.registrationDeadline > formData.courseStartDate) newErrors.registrationDeadline = 'Date limite d\'inscription ne peut pas être après la date de début du cours.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    console.log('Form Data:', formData); // Vérifiez que les données sont correctes

    // Envoyer les données au service EmailJS
    emailjs.send('service_8s9umz2', 'template_uyqzjel', formData, 'BPHvQ2fiVYzzippSm')
      .then(() => {
        toast.success('Email sent successfully!');
        setFormData({
          employeeName: '',
          managerName: '',
          thirdPartyProvider: '',
          courseCode: '',
          courseTitle: '',
          registrationDeadline: new Date(),
          category: '',
          teachingMode: '',
          courseLanguage: '',
          courseDuration: '',
          courseFees: '',
          courseStartDate: new Date(),
        });
      })
      .catch((error) => {
        toast.error('Failed to send email.');
        console.error(error.text);
      });
  };

  const handleCancel = () => {
    setFormData({
      employeeName: '',
      managerName: '',
      thirdPartyProvider: '',
      courseCode: '',
      courseTitle: '',
      registrationDeadline: new Date(),
      category: '',
      teachingMode: '',
      courseLanguage: '',
      courseDuration: '',
      courseFees: '',
      courseStartDate: new Date(),
    });
    setErrors({});
  };

  return (
    <div className="container mt-4">
      <h2>Formulaire de demande de formation offerte par une tierce partie</h2>
      <BootstrapForm ref={form} onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel htmlFor="employeeName">Nom de l'employé.e :</FormLabel>
          <FormControl as="select" name="employeeName" id="employeeName" value={formData.employeeName} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Anass Erraji">Anass Erraji</option>
            <option value="Bilal Elarchi">Bilal Elarchi</option>
            <option value="Khaoula Khoudali">Khaoula Khoudali</option>
          </FormControl>
          {errors.employeeName && <div className="text-danger">{errors.employeeName}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="managerName">Nom du gestionnaire :</FormLabel>
          <FormControl as="select" name="managerName" id="managerName" value={formData.managerName} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="Chantal Bergevin">Chantal Bergevin</option>
          </FormControl>
          {errors.managerName && <div className="text-danger">{errors.managerName}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="thirdPartyProvider">Fournisseur tierce partie :</FormLabel>
          <FormControl type="text" name="thirdPartyProvider" id="thirdPartyProvider" value={formData.thirdPartyProvider} onChange={handleChange} />
          {errors.thirdPartyProvider && <div className="text-danger">{errors.thirdPartyProvider}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="courseCode">Code du cours :</FormLabel>
          <FormControl type="text" name="courseCode" id="courseCode" value={formData.courseCode} onChange={handleChange} />
          {errors.courseCode && <div className="text-danger">{errors.courseCode}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="courseTitle">Titre du cours :</FormLabel>
          <FormControl type="text" name="courseTitle" id="courseTitle" value={formData.courseTitle} onChange={handleChange} />
          {errors.courseTitle && <div className="text-danger">{errors.courseTitle}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="registrationDeadline">Date limite d'inscription :</FormLabel>
          <DatePicker selected={formData.registrationDeadline} onChange={(date) => handleDateChange(date, 'registrationDeadline')} />
          {errors.registrationDeadline && <div className="text-danger">{errors.registrationDeadline}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="category">Catégorie :</FormLabel>
          <FormControl as="select" name="category" id="category" value={formData.category} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="gestion de projet">gestion de projet</option>
            <option value="informatique">informatique</option>
            <option value="gestion des ressources humaines">gestion des ressources humaines</option>
          </FormControl>
          {errors.category && <div className="text-danger">{errors.category}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="teachingMode">Modalité pédagogique :</FormLabel>
          <FormControl as="select" name="teachingMode" id="teachingMode" value={formData.teachingMode} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="en personne">en personne</option>
            <option value="en salle de classe virtuelle">en salle de classe virtuelle</option>
            <option value="apprentissage virtuel à son rythme">apprentissage virtuel à son rythme</option>
          </FormControl>
          {errors.teachingMode && <div className="text-danger">{errors.teachingMode}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="courseLanguage">Langue du cours :</FormLabel>
          <FormControl as="select" name="courseLanguage" id="courseLanguage" value={formData.courseLanguage} onChange={handleChange}>
            <option value="">Select...</option>
            <option value="anglais">anglais</option>
            <option value="français">français</option>
          </FormControl>
          {errors.courseLanguage && <div className="text-danger">{errors.courseLanguage}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="courseDuration">Durée du cours (heures) :</FormLabel>
          <FormControl type="text" name="courseDuration" id="courseDuration" value={formData.courseDuration} onChange={handleChange} />
          {errors.courseDuration && <div className="text-danger">{errors.courseDuration}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="courseFees">Frais du cours (CAD) :</FormLabel>
          <FormControl type="text" name="courseFees" id="courseFees" value={formData.courseFees} onChange={handleChange} />
          {errors.courseFees && <div className="text-danger">{errors.courseFees}</div>}
        </FormGroup>

        <FormGroup>
          <FormLabel htmlFor="courseStartDate">Date de début du cours :</FormLabel>
          <DatePicker selected={formData.courseStartDate} onChange={(date) => handleDateChange(date, 'courseStartDate')} />
        </FormGroup>

        <Button type="submit" variant="primary">Soumettre</Button>
        <Button variant="secondary" className="ml-2" onClick={handleCancel}>Annuler</Button>
      </BootstrapForm>
      <ToastContainer />
    </div>
  );
};

export default Form;
