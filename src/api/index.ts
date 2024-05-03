import { CharactersRequest } from '../interfaces/CharactersRequest';

const charactersRequest = (
  page: number = 1,
  name: string = "",
  status: string = "",
  species: string = "",
  type: string = "",
  gender: string = ""
): CharactersRequest => {
  return {
    req: `query Allcharacters {
      characters(page: ${page}, filter: {name: "${name}", status: "${status}", species: "${species}", type: "${type}", gender: "${gender}" }) {
        info {
          count
          pages
          prev
          next
        }
        results {
          id
          name
          status
          species
          gender
          image
          location {
            name
          }
          episode {
            name
          }
        }
      }
    }`,
  };
};

export { charactersRequest };



// возможна ошибка когда если есть критерии выбора и страница при перезагрузке
// const charactersRequest = (
//   page = 1,
//   name = "",
//   status = "",
//   species = "",
//   type = "",
//   gender = ""
// ) => {
//   return {
//     req: `query Allcharacters {
//       characters(page: ${page}, filter: {name: "${name}", status: "${status}", species: "${species}", type: "${type}", gender: "${gender}" }) {
//         info {
//           count
//           pages
//           prev
//           next
//         }
//         results {
//           id
//           name
//           status
//           species
//           gender
//           image
//           location {
//             name
//           }
//           episode {
//             name
//           }
//         }
//       }
//     }`,
//   };
// };

// export { charactersRequest };


// старое и рабочее
// возможна ошибка когда если есть критерии выбора и страница при перезагрузке
// const charactersRequest = (
//   page = 1,
//   name = "",
//   status = "",
//   species = "",
//   type = "",
//   gender = ""
// ) => {
//   return {
//     req: `query Allcharacters {
//       characters(page: ${page}, filter: {name: "${name}", status: "${status}", species: "${species}", type: "${type}", gender: "${gender}" }) {
//         info {
//           count
//           pages
//           prev
//           next
//         }
//         results {
//           id
//           name
//           status
//           species
//           gender
//           image
//           location {
//             id
//             name
//             dimension
//             type
//             residents{
//               name
//               id
//             }
//           }
//           episode {
//             id
//             name
//             episode
//             characters{
//               name
//               id
//             }
//           }
//         }
//       }
//     }`,
//   };
// };

// export { charactersRequest };
