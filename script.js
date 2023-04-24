const { useState, useRef, useEffect } = React;
import { v4 as uuidv4 } from "https://cdn.skypack.dev/uuid@8.3.2";

// Password Manager component
const PasswordManager = () => {
  const LOCAL_STORAGE = () =>
  JSON.parse(localStorage.getItem('Passwords')) || [];
  const [passwordItems, setPasswordItems] = useState(LOCAL_STORAGE);
  const [passwordLength, setPasswordLength] = useState('');
  const [passwordTitle, setPasswordTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState('');
  const [editingPassword, setEditingPassword] = useState('');
  const inputPasswordRef = useRef(null);
  const inputTitleRef = useRef(null);

  const handlePasswordLengthChange = e => setPasswordLength(e.target.value);

  const handlePasswordTitleChange = e => setPasswordTitle(e.target.value);

  const generatePassword = () => {
    const length = passwordLength;
    const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let retVal = '';
    for (let i = 0, n = charset.length; i < length; i++) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (passwordLength === '') return;
    if (isEditing) {
      setPasswordItems(prevState => {
        const newItems = [...prevState];
        const index = newItems.findIndex(item => item.id === editId);
        newItems.splice(index, 1, {
          id: editId,
          title: passwordTitle,
          password: editingPassword,
          isVisible: false });

        return newItems;
      });
      setIsEditing(false);
      setPasswordTitle('');
      setEditId('');
      setEditingPassword('');
      return;
    }
    setPasswordItems(prevState => [
    ...prevState,
    {
      id: uuidv4(),
      title: passwordTitle,
      password: generatePassword(),
      isVisible: false }]);


    setPasswordTitle('');
  };

  const handleVisible = (id, title, password, isVisible) => {
    if (isVisible) {
      setPasswordItems(prevState => {
        const newItems = [...prevState];
        const index = newItems.findIndex(item => item.id === id);
        newItems.splice(index, 1, {
          id,
          title,
          password,
          isVisible: false });

        return newItems;
      });
    } else {
      setPasswordItems(prevState => {
        const newItems = [...prevState];
        const index = newItems.findIndex(item => item.id === id);
        newItems.splice(index, 1, {
          id,
          title,
          password,
          isVisible: true });

        return newItems;
      });
    }
  };

  const handleDelete = (id) =>
  setPasswordItems(prevState => prevState.filter(item => item.id !== id));

  const handleEdit = (id, title, password) => {
    inputTitleRef.current.focus();
    setIsEditing(prevState => !prevState);
    setPasswordTitle(title);
    setEditId(id);
    setEditingPassword(password);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPasswordTitle('');
    setEditId('');
    setEditingPassword('');
  };

  useEffect(() => inputPasswordRef.current.focus(), []);

  useEffect(
  () => localStorage.setItem('Passwords', JSON.stringify(passwordItems)),
  [passwordItems]);


  return /*#__PURE__*/(
    React.createElement("div", { className: "manager" }, /*#__PURE__*/
    React.createElement("div", { className: "lg-container" }, /*#__PURE__*/
    React.createElement("div", { className: "manager-parent" }, /*#__PURE__*/
    React.createElement("i", { className: "key fas fa-key" }), /*#__PURE__*/
    React.createElement("h1", { className: "manager-title" },
    isEditing ? 'Edit mode' : 'Anzen Manager'), /*#__PURE__*/

    React.createElement("form", { className: "manager-form", onSubmit: handleSubmit },
    isEditing && /*#__PURE__*/
    React.createElement("label", { className: "manager-form-label", htmlFor: "password-title" }, "On edit mode, ", /*#__PURE__*/
    React.createElement("br", null), " you may only change the title."), /*#__PURE__*/


    React.createElement("div", { className: "manager-form-input-container" },
    !isEditing && /*#__PURE__*/
    React.createElement("input", {
      type: "number",
      className: "manager-input",
      onChange: handlePasswordLengthChange,
      ref: inputPasswordRef,
      value: passwordLength,
      name: "password-length",
      id: "password-input",
      placeholder: "Password length...",
      autoComplete: "off",
      max: "30",
      min: "5",
      required: isEditing ? false : true,
      disabled: isEditing ? true : false }), /*#__PURE__*/


    React.createElement("input", {
      type: "text",
      className: "manager-input",
      onChange: handlePasswordTitleChange,
      ref: inputTitleRef,
      value: passwordTitle,
      name: "password-title",
      id: "password-title",
      placeholder: "Enter title...",
      autoComplete: "off",
      maxLength: "20",
      required: true })), /*#__PURE__*/


    React.createElement("div", { className: "manager-form-btn-container" }, /*#__PURE__*/
    React.createElement("button", { type: "submit", className: "btn-border" },
    isEditing ? 'update' : 'generate'),

    isEditing && /*#__PURE__*/
    React.createElement("button", {
      type: "button",
      onClick: handleCancel,
      className: "btn-border" }, "cancel"))), /*#__PURE__*/






    React.createElement("ul", { className: "manager-ul" },
    passwordItems.length === 0 ? /*#__PURE__*/
    React.createElement("div", { className: "lock-container" }, /*#__PURE__*/
    React.createElement("i", { className: "lock fas fa-lock" })) :


    passwordItems.map((item) => /*#__PURE__*/
    React.createElement("li", { className: "manager-ul-li", key: item.id }, /*#__PURE__*/
    React.createElement("h5", { className: "manager-ul-li-title" }, item.title), /*#__PURE__*/
    React.createElement("div", { className: "manager-ul-li-container" }, /*#__PURE__*/
    React.createElement("input", {
      className: "hidden-password",
      contentEditable: "false",
      type: !item.isVisible ? 'password' : 'text',
      value: item.password,
      readOnly: true }), /*#__PURE__*/

    React.createElement("div", null, /*#__PURE__*/
    React.createElement("button", {
      onClick: () =>
      handleVisible(
      item.id,
      item.title,
      item.password,
      item.isVisible),


      title: "Reveal",
      className: "manager-li-icons",
      disabled: isEditing ? true : false }, /*#__PURE__*/

    React.createElement("i", { className: "fas fa-eye" })), /*#__PURE__*/

    React.createElement("button", {
      onClick: () => handleDelete(item.id),
      title: "Delete",
      className: "manager-li-icons",
      disabled: isEditing ? true : false }, /*#__PURE__*/

    React.createElement("i", { className: "fas fa-minus-circle" })), /*#__PURE__*/

    React.createElement("button", {
      onClick: () =>
      handleEdit(item.id, item.title, item.password),

      title: "Edit",
      className: "manager-li-icons",
      disabled: isEditing ? true : false }, /*#__PURE__*/

    React.createElement("i", { className: "fas fa-edit" })))))))))));











};

// App
const App = () => /*#__PURE__*/React.createElement(PasswordManager, null);

// Render
ReactDOM.render( /*#__PURE__*/
React.createElement(React.StrictMode, null, /*#__PURE__*/
React.createElement(App, null)),

document.getElementById('root'));