import React, { useState } from "react";
import Structure from "layouts/Dashboard";
import { RouteComponentProps } from "@reach/router";
import {
  Box,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { $t } from "store/TranslationsContext";
import { doc } from "firebase/firestore";
import { db } from "utils/firebase";
import Loader from "components/Loader";
import Tags from "components/Fields/Tags";
import { createCategories } from "utils/adapter";
import Button from "components/Button";
import { useEffect } from "react";
import useDocumentData from "hooks/useDocumentData";

interface PageProps extends RouteComponentProps {}

const CategoriesPage = ({}: PageProps) => {
  const CATEGORIES_SAVED = $t("CATEGORIES_SAVED");
  const [{ categories }, loadingCategories] = useDocumentData(
    doc(db, "categories/value"),
    [],
    { initialValue: {} }
  );
  const [values, setValues] = useState<Array<string>>(categories);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setValues(categories);
  }, [categories]);
  const handleChange = (next: Array<string>): void => {
    setValues(next);
  };
  const handleSubmit = async () => {
    setLoading(true);
    await createCategories(values);
    setLoading(false);
    alert(CATEGORIES_SAVED);
  };
  return (
    <Structure>
      <Box background="white" p={4} borderRadius={5}>
        <Heading as="h4" size="md" mb={2}>
          {$t("CATEGORIES")}
        </Heading>
        <Loader state={!loadingCategories}>
          <Tags
            value={values}
            onChange={handleChange}
            name="categories"
            alias=""
            label={$t("ADD_YOUR_TAGS")}
          />
          <Flex width="100%" mt={4} justifyContent="flex-end">
            <Button
              colorScheme="green"
              loading={loading}
              onClick={handleSubmit}
              label={$t("SAVE")}
            />
          </Flex>
        </Loader>
      </Box>
    </Structure>
  );
};

export default CategoriesPage;
