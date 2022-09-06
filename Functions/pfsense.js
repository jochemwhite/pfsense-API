//function for pfsense firewall
import axios from "axios";
import dotenv from "dotenv";
import fs from "fs";
dotenv.config();

let url = process.env.PFSENSE_URL;
let username = process.env.PFSENSE_USERNAME;
let password = process.env.PFSENSE_PASSWORD;

// console.log(url, username, password);

let my_headers = { "Content-type": "application/json" };
let my_data = { "client-id": username, "client-token": password };

//Function to get all ports from firewall
async function get_data(name) {
  let response = await axios.get(url + "firewall/nat/port_forward", {
    data: { "client-id": username, "client-token": password },
    headers: my_headers,
  });

  

  let ports = response.data.data;

  let data = Object.keys(ports).map((count) => {
    let description = ports[count].descr;
    +count

    console.log(count + " " + description)

    if (description === name) {
      // console.log(id, description);
      return count;
    } else {
      // console.log("not found");
      return;
    }
  });
  let id = data.filter((x) => x !== undefined)[0];
  console.log(id);
  return id;
}

//Funtion remove port from firewall
async function remove_port(name) {
  let id = await get_data(name);

  let res = await axios.delete(url + "firewall/nat/port_forward/", {
    data: { "client-id": username, "client-token": password, id: id },
  });
  console.log(id);
}

//Function to add port to firewall
async function add_port(req, res) {

    console.log(req.body)
    let source = req.body.host;
    let port = req.body.port;
    let name = req.body.name;    
    let destination = req.body.server;

    

    

 

  let ressponse = await axios.post(url + "firewall/nat/port_forward/", {
    "client-id": username,
    "client-token": password,
    type: "pass",
    interface: "wan",
    ipprotocol: "inet",
    protocol: "tcp/udp",
    src: source,
    target: "192.168.1.100",
    "local-port": "22",
    srcport: "any",
    dst: "wanip",
    dstport: "22",
    descr: name,
    apply: true,
  });
  console.log(ressponse.data);
  
}

// get_data()
// export all function
export { add_port, remove_port };
