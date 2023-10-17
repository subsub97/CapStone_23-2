// export function setupAxiosInterceptors() {
//   function isAccessTokenExpired(accessToken) {
//     if (!accessToken) {
//       return true;
//     }
//   }

//   Axios.interceptors.request.use(
//     async (config) => {
//       if (isAccessTokenExpired()) {
//         const refreshToken = localStorage.getItem("refreshToken");

//         if (refreshToken) {
//           try {
//             const response = await Axios.post("/api/refresh", { refreshToken });

//             if (response.status === 200) {
//               const newAccessToken = response.data.accessToken;
//               config.headers["Authorization"] = `Bearer ${newAccessToken}`;
//             } else {
//               localStorage.removeItem("accessToken");
//               localStorage.removeItem("refreshToken");
//               router.push("/login");
//             }
//           } catch (error) {
//             router.push("/login");
//           }
//         } else {
//           router.push("/login");
//         }
//       }
//       return config;
//     },
//     (error) => {
//       return Promise.reject(error);
//     }
//   );
// }
