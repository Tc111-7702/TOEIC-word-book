import fetch from "isomorphic-fetch";

(async () => {

    const req = await fetch("http://localhost:3000/Long/1");
    console.log(await req.json());

})();

// (async () => {
//     const req = await fetch("http://localhost:3000/sign-up", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(
//             {
//                 name: "user1",
//                 email: "user1@gmail.com",
//                 password: "user11111"
//             }
//         )
//     });
//     const result = await req.json();
//     console.log(
//         {
//             statusCode: req.status,
//             result
//         }
//     );
// })();

// (async () => {
//     const req = await fetch("http://localhost:3000/reset-password", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(
//             {   
//                 email: "user1@gmail.com",
//                 password: "user1111",
//                 confirmPassword: "user1111"
//             }
//         )
//     });
//     const result = await req.json();
//     console.log(
//         {
//             statusCode: req.status,
//             result
//         }
//     );
// })();

