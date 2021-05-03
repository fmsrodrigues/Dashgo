import { Flex, Input, Icon } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox(){
  // Controlled component - Declarativo
  // const [search, setSearch] = useState('');

  // Uncontrolled component - Imperativo
  // const searchInputRef = useRef<HTMLInputElement>(null);
  //searchInputRef.current...
 
  return(
    <Flex
      as="label"
      flex="1"
      py="4"
      px="8"
      ml="6"
      maxWidth={400}
      alignSelf="center"
      color="gray.200"
      position="relative"
      bg="gray.800"
      borderRadius="full"
    >
      <Input 
        color="gray.50"
        variant="unstyled"
        mr="4"
        px="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}

        // Uncontrolled component
        // ref={searchInputRef}

        // Controlled component
        // value={search}
        // onChange={event => setSearch(event.target.value)}
      />

      <Icon as={RiSearchLine} fontSize="20"/>
    </Flex>
  )
}