import React from 'react';
import styled from 'styled-components';

const StyledTextarea = styled.textarea`
  width: 500px;
  height: 200px;
  padding: 10px;
  font-size: 16px;
  font-family: sans-serif;
  border-radius: 5px;
  border: 1px solid gray;
  resize: none;
`;

const Textarea = ({ value, onChange }) => (
    <StyledTextarea value={value} onChange={onChange} />
  );
// function Textarea() {
//   return (
//     <StyledTextarea placeholder="Enter your text here..."/>
//   );
// }

export default Textarea;