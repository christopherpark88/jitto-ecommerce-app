/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  getOverrideProps,
  useAuth,
  useAuthSignOutAction,
} from "@aws-amplify/ui-react/internal";
import { Button, Flex, Image, Text } from "@aws-amplify/ui-react";
export default function NavBarHeader2(props) {
  const { width, checkoutLabel = "Checkout", overrides, ...rest } = props;
  const authAttributes = useAuth().user?.attributes ?? {};
  const buttonThreeNineFourNineThreeFourSixSevenOnClick = useAuthSignOutAction({
    global: true,
  });
  return (
    <Flex
      gap="10px"
      direction="row"
      width="auto"
      height="unset"
      justifyContent="space-between"
      alignItems="center"
      overflow="hidden"
      position="relative"
      boxShadow="0px 2px 6px rgba(0.05098039284348488, 0.10196078568696976, 0.14901961386203766, 0.15000000596046448)"
      padding="16px 32px 16px 32px"
      backgroundColor="rgba(255,255,255,1)"
      {...getOverrideProps(overrides, "NavBarHeader2")}
      {...rest}
    >
      <Flex
        gap="32px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-start"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "Frame 5")}
      >
        <Image
          width="209px"
          height="41px"
          display="block"
          gap="unset"
          alignItems="unset"
          justifyContent="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          objectFit="cover"
          src="https://d2w9rcjva0jotl.cloudfront.net/logo/CompanyLogo.png"
          {...getOverrideProps(overrides, "image")}
        ></Image>
        <Text
          fontFamily="Inter"
          fontSize="16px"
          fontWeight="400"
          color="rgba(13,26,38,1)"
          lineHeight="24px"
          textAlign="left"
          display="block"
          direction="column"
          justifyContent="unset"
          width="unset"
          height="unset"
          gap="unset"
          alignItems="unset"
          shrink="0"
          position="relative"
          padding="0px 0px 0px 0px"
          whiteSpace="pre-wrap"
          children={`${"Hello "}${authAttributes["name"]}`}
          {...getOverrideProps(overrides, "Contact")}
        ></Text>
      </Flex>
      <Flex
        gap="8px"
        direction="row"
        width="unset"
        height="unset"
        justifyContent="flex-end"
        alignItems="center"
        shrink="0"
        position="relative"
        padding="0px 0px 0px 0px"
        {...getOverrideProps(overrides, "actions")}
      >
        <Button
          width="unset"
          height="unset"
          shrink="0"
          size="default"
          isDisabled={false}
          variation="link"
          children={checkoutLabel}
          {...getOverrideProps(overrides, "Button39493466")}
        ></Button>
        <Button
          width="unset"
          height="unset"
          shrink="0"
          size="default"
          isDisabled={false}
          variation="primary"
          children="Sign Out"
          onClick={() => {
            buttonThreeNineFourNineThreeFourSixSevenOnClick();
          }}
          {...getOverrideProps(overrides, "Button39493467")}
        ></Button>
      </Flex>
    </Flex>
  );
}
