import * as net from "net";

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket: any) => {
	socket.on("data", (data: any) => {
		const request = data.toString();

		const path = request.split("\r\n")[0].split(" ")[1];
		console.log(path);

		const query = path.split("/")[2];

		if (path === "/") {
			socket.write("HTTP/1.1 200 OK\r\n");
		} else if (path === `/echo/${query}`) {
			socket.write(
				`HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\nContent-Length: ${query.length}\r\n\r\n ${query}`
			);
		} else {
			socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
		}
	});
	// socket.end();
});

server.listen(4221, "localhost");
