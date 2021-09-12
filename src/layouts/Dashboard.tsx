import React, { ReactNode } from "react";
import Base from "./Base";
import { $t } from "../store/TranslationsContext";
import {
  IconButton,
  Box,
  CloseButton,
  Flex,
  HStack,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Center,
  CircularProgress,
  Container,
  Button,
  ScaleFade,
} from "@chakra-ui/react";
import {
  FiMenu,
  FiGrid,
  FiFolder,
  FiLayout,
  FiCodesandbox,
  FiArchive,
  FiImage,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { ReactText } from "react";
import { useLocation, useNavigate } from "@reach/router";
import { Link } from "@reach/router";
import { useLoader } from "store/LoadingContext";
import Overlay from "components/Overlay";
import { collection } from "firebase/firestore";
import { auth, db } from "utils/firebase";
import { getDateTime } from "utils/helpers";
import { triggerBuild } from "utils/adapter";
import { usePublish } from "store/PublishContext";
import useCollection from "hooks/useCollection";
import useAuth from "hooks/useAuth";
import { signOut } from "firebase/auth";
import NetlifyBadge from "components/NetlifyBadge";

interface LinkItemProps {
  name: string;
  icon: IconType;
  pathname: string;
}

const onlyAdminRoutes = ["/dashboard/modules", "/dashboard/collections"];

const links = (collections: Array<any>) => {
  let LinkItems: Array<LinkItemProps> = [
    { name: $t("GALLERY"), icon: FiImage, pathname: "/dashboard/gallery" },
    {
      name: $t("MODULES"),
      icon: FiCodesandbox,
      pathname: "/dashboard/modules",
    },
    {
      name: $t("COLLECTIONS"),
      icon: FiFolder,
      pathname: "/dashboard/collections",
    },
    { name: $t("PAGES"), icon: FiLayout, pathname: "/dashboard/pages" },
    { name: $t("CATEGORIES"), icon: FiGrid, pathname: "/dashboard/categories" },
  ];
  if (collections?.length > 0 || collections) {
    LinkItems = [
      ...LinkItems,
      ...collections?.map((collection) => {
        return {
          pathname: `/dashboard/${collection.id}`,
          name: collection.data().name,
          icon: FiArchive,
        };
      }),
    ];
  }
  return LinkItems;
};

export default function SidebarWithHeader({
  children,
  name,
}: {
  children: ReactNode;
  name?: string | any;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading] = useLoader();
  const [user] = useAuth({ auth, deps: [] });
  return (
    <Base>
      <>
        <Overlay
          isOpen={loading}
          headerLabel={$t("LOADING")}
          size="xl"
          cancellable={false}
        >
          <Container height="100%" centerContent={true}>
            <Center>
              <CircularProgress isIndeterminate />
            </Center>
          </Container>
        </Overlay>
        <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
          {user && (
            <SidebarContent
              user={user}
              onClose={() => onClose}
              display={{ base: "none", md: "block" }}
            />
          )}
          <Drawer
            autoFocus={false}
            isOpen={isOpen}
            placement="left"
            onClose={onClose}
            returnFocusOnClose={false}
            onOverlayClick={onClose}
            size="full"
          >
            <DrawerContent>
              {user && <SidebarContent onClose={onClose} user={user} />}
            </DrawerContent>
          </Drawer>
          {/* mobilenav */}
          <MobileNav onOpen={onOpen} name={name} />
          <Box ml={{ base: 0, md: 60 }} p="4" flex="1">
            {children}
          </Box>
        </Box>
      </>
    </Base>
  );
}

interface SidebarProps extends BoxProps {
  onClose: () => void;
  user: any;
}

const SidebarContent = ({ onClose, user, ...rest }: SidebarProps) => {
  const publish = usePublish();
  const PUBLISH_MESSAGE = $t("PUBLISH_MESSAGE");
  const location = useLocation();
  const [collections] = useCollection(collection(db, "collections"), []);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          {process.env.REACT_APP_TITLE_SIMPLIFIED || ""}
        </Text>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {links(collections?.docs)
        .filter((link) => {
          if (
            onlyAdminRoutes.includes(link.pathname) &&
            user.email === process.env.REACT_APP_ADMIN_EMAIL
          )
            return true;
          if (!onlyAdminRoutes.includes(link.pathname)) return true;
        })
        .map((link) => (
          <NavItem
            key={link.name}
            icon={link.icon}
            border={
              location.pathname === link.pathname
                ? "1px solid lightgray"
                : "none"
            }
            pathname={link.pathname}
            name={link.name}
          >
            {link.name}
          </NavItem>
        ))}
      <Container
        flexDirection="column"
        position="absolute"
        bottom={5}
        width="100%"
        px={4}
      >
        <ScaleFade initialScale={0.9} in={publish}>
          <Flex flexDirection="column">
            <Text fontSize="sm" color="gray.500" width="100%">
              <span>{$t("LAST_PUBLISH")}:</span>
            </Text>{" "}
            <Text fontSize="sm" color="gray.500" width="100%">
              {getDateTime(publish?.date)}
            </Text>
            <Button
              colorScheme="green"
              onClick={() => triggerBuild(PUBLISH_MESSAGE)}
              my={2}
              size="lg"
              width="100%"
            >
              {$t("PUBLISH")}
            </Button>
            <NetlifyBadge />
          </Flex>
        </ScaleFade>
      </Container>
    </Box>
  );
};

interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactText;
  pathname: string;
  name: string;
}
const NavItem = ({ icon, children, pathname, name, ...rest }: NavItemProps) => {
  return (
    <Link
      to={pathname}
      style={{ textDecoration: "none" }}
      replace
      state={{ name }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
  name?: string | any;
}
const MobileNav = ({ onOpen, name, ...rest }: MobileProps) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (err) {
      alert(err);
    }
  };
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between" }}
      {...rest}
    >
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />
      <Text
        display={{ base: "flex", md: "none" }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold"
      >
        {process.env.REACT_APP_TITLE_SIMPLIFIED || ""}
      </Text>
      <HStack spacing={{ base: "0", md: "6" }} width="100%">
        <Flex flex="1" width="100%" justifyContent="space-between">
          <Text as="h2" fontSize="xl" fontWeight="bold">
            {name}
          </Text>
          <Button size="sm" onClick={handleLogout}>
            {$t("LOGOUT")}
          </Button>
        </Flex>
      </HStack>
    </Flex>
  );
};
