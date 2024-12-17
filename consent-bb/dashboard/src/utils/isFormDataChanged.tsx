  // To check the input field is changed during update
export const isFormDataChanged = (formState: any) => {
  const dirtyFields = formState.dirtyFields;
  return Object.keys(dirtyFields).length > 0;
};
