# Casino Game by Kliver Daniel
<br><br>
<b>Pre-requirements</b><br>
<ul>
  <li>node 14+</li>
  <li>docker</li>
  <li>yarn or npm</li>
  <li>vscode or a code editor</li>
  <li>internet connection</li>
</ul>
<br><br>

<b>To run this project in docker</b> do the next:
<br>

Clone the project and change to branch backend <br>
<code>git checkout backend </code>
<br>
> To make sure, install dependencies with <code>yarn install</code> or <code>npm install</code>
<br>
Build the image<br>
<code>docker build -t kliver98/casigame</code>
<br>
Run the image<br>
<code>docker run -d -p 80:3000 kliver98/casigame</code>
<br> 
On this case, you must to go on <code>localhost</code> on your browser<br>
If you have port 80 bussy, you must to release it

<br>
<br>

<b>To run this project directly</b> do the next:
<br>
Clone the project and change to branch frontend <br>
<code>git checkout frontend </code>
<br>
Install dependencies with <code>yarn install</code> or <code>npm install</code>
<br>
After all dependencies downloaded, type <code>yarn start</code> or <code>npm start</code> and automatically a new tab in browser will open
<br>
In case it don't but starts correctly, go to <br>
[http://localhost:3000](http://localhost:3000)
<br>
<br>
# If you run both project at time with no docker, port might confuse and not work correctly
