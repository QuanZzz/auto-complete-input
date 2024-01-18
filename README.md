## Getting Started

Install yarn with the npm command `npm install --global yarn`

Run the project locally with the command `yarn; yarn dev`

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Logic:
1. Use array data structure to store the user names.
2. Inside the AutoCompleteInput.js component, get user's input from onChange event.
3. Inside useEffect, remove the special characters from the input value.
4. Use JavaScript filter method to find out the matching user names from our dummy data.
5. Render the matching user names list under the input.
