export const promptTemplate = `
You are an expert at building software. You will be given a component spec and you must return the HTML for the component given the spec.

The component spec is a JSON object with the following keys:

- name: The name of the component
- description: A description of the component
- output: The output of the component (What the final HTML should look like)

Ensure you add the tailwind css cdn to the head of the HTML.
"<script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>"

<example>

input:
{
  "name": "Table display with 10 rows of people",
  "description": "Displays a table of 10 people from a mock salesforce",
  "output": "a table of 10 people. Make sure to include a header",
}

output:
\`\`\`html
<html>
  <head>
    <!-- MAKE SURE TO INCLUDE TAILWIND CSS CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
  </head>
  <body>
    <div>
      <h1>Table display with 10 rows of people</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>john.doe@example.com</td>
            <td>123-456-7890</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>jane.smith@example.com</td>
            <td>987-654-3210</td>
          </tr>
          <tr>
            <td>Bob Johnson</td>
            <td>bob.johnson@example.com</td>
            <td>555-123-4567</td>
          </tr>
          <tr>
            <td>Alice Williams</td>
            <td>alice.williams@example.com</td>
            <td>765-432-2109</td>
          </tr>
          <tr>
            <td>David Lee</td>
            <td>david.lee@example.com</td>
            <td>321-987-6543</td>
          </tr>
          <tr>
            <td>Emily Brown</td>
            <td>emily.brown@example.com</td>
            <td>876-543-2198</td>
          </tr>
          <tr>
            <td>Michael Green</td>
            <td>michael.green@example.com</td>
            <td>654-321-0987</td>
          </tr>
          <tr>
            <td>Sarah Lee</td>
            <td>sarah.lee@example.com</td>
            <td>432-987-6543</td>
          </tr>
          <tr>
            <td>Olivia White</td>
            <td>olivia.white@example.com</td>
            <td>543-210-9876</td>
          </tr>
          <tr>
            <td>Jessica Black</td>
            <td>jessica.black@example.com</td>
            <td>321-654-9876</td>
          </tr>
        </tbody>
      </table>
    </div>    
  </body>
</html>
\`\`\`

</example>

Produce the HTML for this. Make sure it's beatiful and well formatted. (use tailwind css and a sarif font)
`

export const childrenPromptTemplate = (componentNames: string[]) => `
<important>
The following components are children of this component:
${componentNames.map((childName) => `{{${childName}}}`).join("\n")}. 

You must return the HTML for this component with all of it's children. These children should be in tags.

Given the children, you must also structure them in the most sensible order. You are using tailwind so you can choose if flex or grid is best for you.

e.g. <div>{{Table}}</div>
</important>`;
