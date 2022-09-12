**If at some point you don't know how to install something, etc, the
answer is probably the link at end of the instructions in section _FAQ
&& RESOLVE PROBLEMS && HELPFUL LINKS_**

**PART 1**

1.  Download windows terminal from microsoft store to not use windows
    powershell

2.  Install wsl from
    [[https://docs.microsoft.com/en-us/windows/wsl/install]

3.  Install ubuntu version 20.04.4 LTS becasue on 22.04 LTS was problem
    when i tried to create a user. from
    [[https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6]
    (05.05.2022)

4.  Run ubuntu from windows terminal (click on down arrow next to \"+\"
    and select ubuntu)

5.  Install docker from (may be changed for a different ubuntu version
    in the future)
    [[https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-20-04]

6.  Paste \"sudo dockerd\" in terminal (after every time unix starts)

7.  Open new ubuntu terminal on windows terminal

8.  Install nvm - \> \"curl -o-
    [[https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh]{.underline}](https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh)
    \| bash\"

9.  Close the terminal tab and open new one according to the message
    displayed on the screen

10. Install node and npm in latest version (node v16.15.0 and npm 8.9.0
    for 05.05.2022 )

    \"nvm install \--lts \--latest-npm\"

11. Install git and clone repo

tip 1. remember to not use any Git Extensions to avoid clone repo as
root, better do it manually

\"git clone
[[https://oauth2:\<AUTH_TOKEN\>@gitlab.tech.orange/ra-dev-ols/interactive-s]{.underline}](https://oauth2:%3cAUTH_TOKEN%3e@gitlab.tech.orange/ra-dev-ols/interactive-s)ervices/dynamic-homepage.git\"

or use gitlab login and password manager for if you use more than one
project

12. Setup for WSL2 to be able to host services from linux (via
    powershell with admin rights)

    12.1. Verify there is no port forwarding already in place: netsh
    interface portproxy show all

    12.2.Open port on windows firewall netsh advfirewall firewall add
    rule name=\"Allow connections to dev HTTP server\" dir=in action=allow
    protocol=TCP localport=8080

12.3 Configure port forwarding netsh interface portproxy add v4tov4
listenaddress= listenport=8080 connectaddress=localhost connectport=8080

12.4. Reset in case server is inaccessible from lan: netsh interface
portproxy delete v4tov4 listenaddress=192.168.2.103 listenport=8080 //
your stb netsh interface portproxy add v4tov4
listenaddress=192.168.2.103 listenport=8080 connectaddress=localhost
connectport=8080

13. Add docker to groups \"usermod -a -G docker \"

![](./imageReadMe/media/image1.png)

14. Open new ubuntu terminal tab go to dynamic-homepage directory and
    configure repositories

> **PART 2**

1. Configure repositories

- npm config set registry
  https://artifactory.tech.orange/artifactory/api/npm/npmproxy/

- npm config set \@orange-ra-dev:registry
  https://gitlab.tech.orange/api/v4/projects/179081/packages/npm/

- npm config set \--
  \'//gitlab.tech.orange/api/v4/projects/179081/packages/npm/:\_authToken\'
  \"\<your token with API level access\>\"

  NOTE: Private repository for \@orange-ra-dev is subject to change in
  case we start using more internally updated / developed libraries

2.  npm install && npm run build

3.  Run web server of your choice to host your build directory as \<your
    IP\>:8080/

For example: docker run \--name nginx -v
\"\$PWD\"/build:/usr/share/nginx/html:ro \--rm -p 8080:80 -d nginx
(fryour project root directory)

4.  Define a new service named DH in
    /flash/Resources/Openweb/\*/\*/InteractiveServicesTable.json (if not
    already present), ensure the url points to your server

{

\"name\": \"DH\",

\"url\": \"http://\<your IP\>:8080/index.html\"

},

5.  In STB write the following command in order to go to the chosen
    folder and download cd /flash/Resources/Openweb/\*/\*/ && rm
    InteractiveServicesTable.json && wget
    [http://\<TwojeIP\>:8080/stb/InteractiveServicesTable.json]

(this operation you perform only one time on STB.

6.  Check if the server (in my case nginx) responds by writing the above
    address from step 4 into your browser. When the website doesn't
    throw an error you may move to the next step, otherwise you need to
    check if the server was.

7.  Start the server X(XLAUNCHER). In case of success you'll see it on
    your icon panel

![](./imageReadMe/media/image2.png)

If you use MobaXterm a XLAUNCHER doesn't respond, check if in
MobaXterm your server is off. (a switched on server may cause
complications connected to starting XLAUNCHERA which is necessary for
starting web inspector in the next step.

![](./imageReadMe/media/image3.png)

![](./imageReadMe/media/image4.png)

8.  In your client ubuntu (necessarily on your account)
    You need to write the following commands, in order to start web
    inspector

\- export DISPLAY=\$(cat /etc/resolv.conf \| grep nameserver \| awk
\'{print \$2}\'):0

\- epiphany inspector://\[STB_IP_ADDRESS\]:2999

(STB ip address can be found in your remote control tool .g.
MobaXterm by typing ifconfig)

9.  After starting web inspector, go to Inspect section, then Console
    tab and write the following command in order to start.

setActiveService(\'DH\', {pageExternalId: \'Home_Kids\'})

![](./imageReadMe/media/image5.png)

**\*PREVIEW OF CHANGES IN THE BROWSER\***

After each change in the project, in order to see changes fast in the
browser you need to write the following command. (folder with project)

![](./imageReadMe/media/image6.png)

**\*STARTING THE PROJECT AFTER THE CHANGES \***

In case you want the new changes to follow on TV, do npm run build and
restart STB by reboot command or by the button at the back of the box.
After this, go back to step 7-8. In case of problems, come back to
step 5.

**\*STARTING PROJECT AFTER RESTARTING THE COMPUTER\***

1\. sudo dockerd

2\. start serwera

3\. Look above at step 6-9

**\*OPTIONAL\* IF YOU WANT TO VIEW CHANGES DIRECTLY THROUGH TV**

1.  Add top menu entry, for example by putting build/topMenuConfig.json
    onto your box into /flash/Resources/topMenuConfig/\*/\*

cd /flash/Resources/topMenuConfig/\*/\* \# this actually works with
the stars

rm topMenuConfig.json \# or mv topMenuConfig.json
topMenuConfig.json.bak

wget http://\<your IP\>:8080/topMenuConfig.json

2.  Reboot your stb, navigate to dh in top menu and press OK to launch
    the service.

**FAQ _&&_ RESOLVE PROBLEMS _&&_ HELPFUL LINKS**

[[https://espace.agir.orange.com/display/RAKNOW/OLS+SOP10+-+WebInsector]

\*

**Incase of the problem when :8080 page is unavailable or/and
localhost:8080 page is unavailable**

disable firewall, change your network profile to private, Make sure
your ip address hasn\'t changed. if it doesn\'t work - reset the
forwarding via powershell with admin rights:

- _\"netsh interface portproxy delete v4tov4 listenaddress=
  listenport=8080 netsh interface portproxy add v4tov4 listenaddress=
  listenport=8080 connectaddress=localhost connectport=8080\"_

- _netsh advfirewall firewall add rule name=\"Allow connections to dev
  HTTP server\" dir=in action=allow protocol=TCP localport=8080_

If service still doesn\'t work you can check tle logs from the stb
webinspector console during launching service - maybe RA update will
solve the problem

\*

\*

![](./imageReadMe/media/image7.png)

You should check what is wrong with the catalogs by checking the owner
of the catalogs

![](./imageReadMe/media/image8.png)

How to solve the problem?

_sudo chown \< username \> build_

\*

\*

**topmenuConfig.json problem.**

How to solve the problem?

All files that you wanna download on stb via wget should be placed in
build(not public) catalog

\*

\*

**How to check if a container is launched and on which port?**

Use this command: _docker ps_

![](./imageReadMe/media/image9.png)

**In order to stop the operation of a given container, enter the
following command in the terminal:** _docker stop nginx_
![](./imageReadMe/media/image10.png)

\*

\*

**Problem with TortoiseGit**

If you are using tortoiseGit and have trouble changing branch etc
check your global git settings. Chances are, the settings are the same
as your git client that you use on a daily basis**.**

**To do this, go to the TortoiseGit settings:**

- enter the command explorer.exe . in the terminal to open the
  directory with folders

- right click on the selected project and then in TortoiseGit and
  select settings from the drop-down list

![](./imageReadMe/media/image11.png)

- Select the button that says \"Edit global .gitconfig\"

- Check your settings. For example, they should look something like
  this:

![](./imageReadMe/media/image12.png)

\*
