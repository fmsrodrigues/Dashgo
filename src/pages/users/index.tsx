import { Box, Flex, Heading, Button, Icon, Table, Thead, Tr, Th, Checkbox, Tbody, Td, Text, useBreakpointValue, Spinner, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { api } from "../../services/api";
import { queryClient } from "../../services/queryClient";
import { getUsers, useUsers } from "../../services/hooks/useUsers";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

type User = {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

type UserListProps = {
  users: User[];
  totalCount: number;
}

export default function UserList({ users, totalCount }: UserListProps) {
  const [page, setPage] = useState(1);

  const { data, isLoading, isFetching, error } = useUsers(page, {
    // use this to have initialData
    // initialData: { users, totalCount },
  });

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefecthUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const { data } = await api.get(`users/${userId}`);

      return data;
    }, { staleTime: 1000 * 60 * 10 })
  }

  return(
    <Box>
      <Header />

      <Flex 
        w="100%"
        my="6"
        maxWidth={1480}
        mx="auto"
        px="6"  
      >
        <Sidebar />

        <Box
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p="8"
        >
          <Flex
            mb="8"
            justify="space-between"
            align="center"
          >
            <Heading
              size="lg"
              fontWeight="normal"
            >
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4"/>}
            </Heading>

            <NextLink href="/users/create" passHref>
              <Button
                as="a"
                size="sm"
                fontSize="sm"
                colorScheme="pink"
                leftIcon={<Icon as={RiAddLine} fontSize="20"/>}
                alignItems="center"
              >
                Criar Novo
              </Button>
            </NextLink>
          </Flex>

          

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex>
              <Text>Falha ao obter dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table
                colorScheme="whiteAlpha"
              >
                <Thead>
                  <Tr>
                    <Th 
                      px={["4", "4" , "6"]}
                      color="gray.300"
                      w="8"
                    >
                      <Checkbox 
                        colorScheme="pink"
                      />
                    </Th>
                    <Th>Usuário</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    {isWideVersion && <Th w="8"></Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4" , "6"]}>
                      <Checkbox 
                          colorScheme="pink"
                        />
                      </Td>
                      <Td>
                        <Box>
                          <Link color="purple.400" onMouseEnter={() => handlePrefecthUser(user.id)}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </Link>
                          <Text fontSize="small" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && <Td>
                        {user.createdAt}
                      </Td>}
                      {isWideVersion && <Td>
                        <Button
                          as="a"
                          size="sm"
                          fontSize="sm"
                          colorScheme="purple"
                          leftIcon={<Icon as={RiPencilLine} fontSize="16"/>}
                        >
                          Editar
                        </Button>
                      </Td>}
                    </Tr>
                  ))}
                </Tbody>
              </Table>     

              <Pagination 
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />  
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}

// Mirage currently only works on the browser side, request will not succeed
// export const getServerSideProps: GetServerSideProps = async () => {
//   const { users, totalCount } = await getUsers(1);
  
//   return {
//     props: {
//       users,
//     }
//   }
// }