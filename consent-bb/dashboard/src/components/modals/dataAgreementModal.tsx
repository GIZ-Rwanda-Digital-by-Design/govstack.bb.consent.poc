import {
  useState,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
} from "react";
import {
  useForm,
  FormProvider,
  useFieldArray,
  useWatch,
} from "react-hook-form";

import { Drawer, Typography, Button, Box, Avatar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DefaultBanner from "../../assets/OrganisationDefaultBanner.jpg";
import DefaultLogo from "../../assets/OrganisationDefaultLogo.png";

import DataAgreementPersonalDataTable from "../dataAgreements/DataAgreementPersonalDataTable";
import DataAgreementPolicy from "../dataAgreements/DataAgreementPolicy";
import DPIAConfigurations from "../dataAgreements/DPIAConfiguration";
import DataSchemaModal from "./dataSchemaModal";
import {
  Container,
  HeaderContainer,
  BannerContainer,
  DetailsContainer,
  FooterContainer,
  buttonStyle,
  disabledButtonstyle,
} from "./modalStyle";
import {
  DataAgreementPayload,
  validateDataSources,
} from "../dataAgreements/DataAgreementActions";
import { HttpService } from "../../service/HTTPService";
import { Purpose } from "../dataAgreements/Purpose";
import { Version } from "../dataAgreements/Version";
import { DataExchangeModeFormControl } from "../dataAgreements/DataExchangeMode";
import { PurposeDescription } from "../dataAgreements/PurposeDescription";
import { LawfullBasisOfProcessingFormControll } from "../dataAgreements/LawfullBasisOfProcessing";
import { OrganizationDetailsCRUDContext } from "../../contexts/organizationDetailsCrud";
import SnackbarComponent from "../notification";
import { isFormDataChanged } from "../../utils/isFormDataChanged";
import { useTranslation } from "react-i18next";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  mode: string;
  successCallback?: any;
  resourceName?: string;
  selectededDataAgreementFromDataAgreement?: any;
  setSelectedDropdownValue?: any;
}

let defaultValue = {
  Name: "",
  Description: "",
  Version: "1.0.0",
  AttributeType: "null",
  LawfulBasisOfProcessing: "consent",
  PolicyURL: "https://igrant.io/policy.html",
  Jurisdiction: "London, GB",
  IndustryScope: "Retail",
  StorageLocation: "Europe",
  dataRetentionPeriodDays: 0,
  Restriction: "Europe",
  Shared3PP: false,
  DpiaDate: new Date().toISOString().slice(0, 16),
  DpiaSummaryURL: "https://privacyant.se/dpia_results.html",
  dataAttributes: [{ attributeName: "", attributeDescription: "" }],
  dataSources: [
    {
      name: "",
      sector: "",
      location: "",
      privacyDashboardUrl: "",
    },
  ],
};

export default function DataAgreementModal(props: Props) {
  const {
    open,
    setOpen,
    mode,
    successCallback,
    resourceName,
    selectededDataAgreementFromDataAgreement,
    setSelectedDropdownValue,
  } = props;
  const { t } = useTranslation("translation");
  const [selectedDataAgreement, setSelectedDataAgreement] = useState<any>();
  const [dataAgreementIdForUserRecordes, setDataAgreementIdForUserRecordes] =
    useState("");
  const [policyDetailsForInitialValue, setPolicyDetailsForInitialValue] =
    useState<any>();
  const [openSnackBar, setOpenSnackBar] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    if (open) {
      HttpService.listAllPolicies().then((response) => {
        setPolicyDetailsForInitialValue(response[0]);
      });
    }
  }, [open]);

  const methods = useForm({
    mode: "onChange",
    defaultValues: {
      ...defaultValue,
    },
  });
  const { control } = methods;

  const { fields, remove, append } = useFieldArray({
    control,
    name: "dataAttributes",
    rules: {
      required: true,
    },
  });

  const {
    fields: fieldsDataAttributes,
    remove: removeDataAttributes,
    append: appendDataAttributes,
  } = useFieldArray({
    control,
    name: "dataSources",
    rules: {
      required: true,
    },
  });

  const AttributeType = useWatch({
    control: methods.control,
    name: `AttributeType`,
  });

  const dataSources = useWatch({
    control: methods.control,
    name: `dataSources`,
  });

  useEffect(() => {
    if (mode === "Create") {
      methods.reset({
        Name: "",
        Description: "",
        Version: "1.0.0",
        AttributeType: "null",
        LawfulBasisOfProcessing: "consent",
        PolicyURL: policyDetailsForInitialValue?.url,
        Jurisdiction: policyDetailsForInitialValue?.jurisdiction,
        IndustryScope: policyDetailsForInitialValue?.industrySector,
        StorageLocation: policyDetailsForInitialValue?.storageLocation,
        dataRetentionPeriodDays: Math.floor(
          policyDetailsForInitialValue?.dataRetentionPeriodDays / 365
        ),
        Restriction: policyDetailsForInitialValue?.geographicRestriction,
        Shared3PP: policyDetailsForInitialValue?.thirdPartyDataSharing,
        DpiaDate: new Date().toISOString().slice(0, 16),
        DpiaSummaryURL: "https://privacyant.se/dpia_results.html",
        dataAttributes: [{ attributeName: "", attributeDescription: "" }],
        dataSources: [
          {
            name: "",
            sector: "",
            location: "",
            privacyDashboardUrl: "",
          },
        ],
      });
    }

    if (
      selectededDataAgreementFromDataAgreement &&
      resourceName !== "userrecords" &&
      mode !== "Create"
    ) {
      let dataAgreements = selectededDataAgreementFromDataAgreement;
      let dataAttributes =
        selectededDataAgreementFromDataAgreement.dataAttributes;
      let dataSources = selectededDataAgreementFromDataAgreement.dataSources;

      setSelectedDataAgreement(dataAgreements);
      if (mode === "Update") {
        methods.reset({
          Name: dataAgreements.purpose,
          Description: dataAgreements.purposeDescription,
          Version:
            dataAgreements.version === "" ? "0.0.0" : dataAgreements.version,
          AttributeType: dataAgreements.methodOfUse,
          LawfulBasisOfProcessing: dataAgreements.lawfulBasis,
          PolicyURL: dataAgreements.policy.url,
          Jurisdiction: dataAgreements.policy.jurisdiction,
          IndustryScope: dataAgreements.policy.industrySector,
          StorageLocation: dataAgreements.policy.storageLocation,
          dataRetentionPeriodDays: Math.floor(
            dataAgreements.policy.dataRetentionPeriodDays / 365
          ),
          Restriction: dataAgreements.policy.geographicRestriction,
          Shared3PP: dataAgreements.policy.thirdPartyDataSharing,
          DpiaDate: dataAgreements.dpiaDate,
          DpiaSummaryURL: dataAgreements.dpiaSummaryUrl,
          dataAttributes: dataAttributes?.map((attribute: any) => {
            const { name, description, ...otherProps } = attribute;
            return {
              attributeName: name,
              attributeDescription: description,
              ...otherProps,
            };
          }),
          dataSources:
            dataSources && dataSources.length > 0
              ? dataSources.map((attribute: any) => ({
                  name: attribute.name || "",
                  sector: attribute.sector || "",
                  location: attribute.location || "",
                  privacyDashboardUrl: attribute.privacyDashboardUrl || "",
                }))
              : [
                  {
                    name: "",
                    sector: "",
                    location: "",
                    privacyDashboardUrl: "",
                  },
                ],
        });
      } else if (
        mode === "Read" &&
        dataAgreements.selectedRevision !== undefined &&
        dataAgreements?.selectedRevision?.version !== dataAgreements.version
      ) {
        methods.reset({
          Name: dataAgreements.selectedRevision.purpose,
          Description: dataAgreements.selectedRevision.purposeDescription,
          Version: dataAgreements.selectedRevision.version,
          AttributeType: dataAgreements.selectedRevision.methodOfUse,
          LawfulBasisOfProcessing: dataAgreements.selectedRevision.lawfulBasis,
          PolicyURL: dataAgreements.selectedRevision.policy.url,
          Jurisdiction: dataAgreements.selectedRevision.policy.jurisdiction,
          IndustryScope: dataAgreements.selectedRevision.policy.industrySector,
          StorageLocation:
            dataAgreements.selectedRevision.policy.storageLocation,
          dataRetentionPeriodDays: Math.floor(
            dataAgreements.selectedRevision.policy.dataRetentionPeriodDays / 365
          ),

          Restriction:
            dataAgreements.selectedRevision.policy.geographicRestriction,
          Shared3PP:
            dataAgreements.selectedRevision.policy.thirdPartyDataSharing,
          DpiaDate: dataAgreements.selectedRevision.dpiaDate,
          DpiaSummaryURL: dataAgreements.selectedRevision.dpiaSummaryUrl,
          dataAttributes: dataAgreements.selectedRevision.dataAttributes?.map(
            (attribute: any) => {
              const { name, description, ...otherProps } = attribute;
              return {
                attributeName: name,
                attributeDescription: description,
                ...otherProps,
              };
            }
          ),
          dataSources: dataAgreements.selectedRevision?.dataSources?.map(
            (attribute: any) => {
              const { name, sector, location, privacyDashboardUrl } = attribute;
              return {
                name: name,
                sector: sector,
                location: location,
                privacyDashboardUrl: privacyDashboardUrl,
              };
            }
          ),
        });
      } else if (
        mode === "Read" &&
        (dataAgreements?.selectedRevision?.version === dataAgreements.version ||
          dataAgreements.selectedRevision === undefined)
      ) {
        methods.reset({
          Name: dataAgreements.purpose,
          Description: dataAgreements.purposeDescription,
          Version:
            dataAgreements.version === "" ? "0.0.0" : dataAgreements.version,
          AttributeType: dataAgreements.methodOfUse,
          LawfulBasisOfProcessing: dataAgreements.lawfulBasis,
          PolicyURL: dataAgreements.policy.url,
          Jurisdiction: dataAgreements.policy.jurisdiction,
          IndustryScope: dataAgreements.policy.industrySector,
          StorageLocation: dataAgreements.policy.storageLocation,
          dataRetentionPeriodDays: Math.floor(
            dataAgreements.policy.dataRetentionPeriodDays / 365
          ),

          Restriction: dataAgreements.policy.geographicRestriction,
          Shared3PP: dataAgreements.policy.thirdPartyDataSharing,
          DpiaDate: dataAgreements.dpiaDate,
          DpiaSummaryURL: dataAgreements.dpiaSummaryUrl,
          dataAttributes: dataAttributes?.map((attribute: any) => {
            const { name, description, ...otherProps } = attribute;
            return {
              attributeName: name,
              attributeDescription: description,
              ...otherProps,
            };
          }),
          dataSources: dataSources?.map((attribute: any) => {
            const { name, sector, location, privacyDashboardUrl } = attribute;
            return {
              name: name,
              sector: sector,
              location: location,
              privacyDashboardUrl: privacyDashboardUrl,
            };
          }),
        });
      }
    }

    if (
      selectededDataAgreementFromDataAgreement &&
      resourceName === "userrecords" &&
      mode === "Read"
    ) {
      let dataAgreements = selectededDataAgreementFromDataAgreement;
      let dataAttributes =
        selectededDataAgreementFromDataAgreement.dataAttributes;
      setSelectedDataAgreement(dataAgreements);

      setDataAgreementIdForUserRecordes(dataAgreements.id);
      let dataSources = selectededDataAgreementFromDataAgreement.dataSources;

      methods.reset({
        Name: dataAgreements.purpose,
        Description: dataAgreements.purposeDescription,
        Version: dataAgreements.version,
        AttributeType: dataAgreements.methodOfUse,
        LawfulBasisOfProcessing: dataAgreements.lawfulBasis,
        PolicyURL: dataAgreements.policy.url,
        Jurisdiction: dataAgreements.policy.jurisdiction,
        IndustryScope: dataAgreements.policy.industrySector,
        StorageLocation: dataAgreements.policy.storageLocation,
        dataRetentionPeriodDays: Math.floor(
          dataAgreements.policy.dataRetentionPeriodDays / 365
        ),
        Restriction: dataAgreements.policy.geographicRestriction,
        Shared3PP: dataAgreements.policy.thirdPartyDataSharing,
        DpiaDate: dataAgreements.dpiaDate,
        DpiaSummaryURL: dataAgreements.dpiaSummaryUrl,
        dataAttributes: dataAttributes.map((attribute: any) => {
          const { name, description, ...otherProps } = attribute;
          return {
            attributeName: name,
            attributeDescription: description,
            ...otherProps,
          };
        }),
        dataSources: dataSources?.map((attribute: any) => {
          const { name, sector, location, privacyDashboardUrl } = attribute;
          return {
            name: name,
            sector: sector,
            location: location,
            privacyDashboardUrl: privacyDashboardUrl,
          };
        }),
      });
    }
  }, [
    selectededDataAgreementFromDataAgreement,
    open,
    mode,
    policyDetailsForInitialValue,
  ]);

  const [openExistingSchemaModal, setOpenExistingSchemaModal] = useState(false);

  const { organisationDetails, logoImageBase64, coverImageBase64 }: any =
    useContext(OrganizationDetailsCRUDContext);

  const onPublish = (createdData: any) => {
    let active = true;
    let lifecycle = "complete";

    if (
      dataSources &&
      dataSources.length > 0 &&
      AttributeType === "data_using_service"
        ? validateDataSources(dataSources)
        : true
    ) {
      if (mode === "Create") {
        HttpService.addDataAgreements(
          DataAgreementPayload(createdData, active, lifecycle, mode)
        )
          .then(() => {
            successCallback();
            methods.reset({ ...defaultValue });
            setSelectedDropdownValue({});
            setOpen(false);
          })
          .catch((error) => {
            let errorDescription = error.response.data.errorDescription;
            setError(
              errorDescription === "Data agreement purpose exists"
                ? t("dataAgreements.purposeExist")
                : errorDescription
            );
            setOpenSnackBar(true);
          });
      } else if (
        mode === "Update" &&
        (selectedDataAgreement && selectedDataAgreement.lifecycle === "draft"
          ? selectedDataAgreement.lifecycle === "draft"
          : isFormDataChanged(methods.formState))
      ) {
        HttpService.updateDataAgreementById(
          DataAgreementPayload(
            createdData,
            active,
            lifecycle,
            mode,
            selectedDataAgreement
          ),
          selectedDataAgreement?.id
        )
          .then((response) => {
            successCallback();
            setSelectedDropdownValue({});
            methods.reset({ ...defaultValue });
            setOpen(false);
          })
          .catch((error) => {
            let errorDescription = error.response.data.errorDescription;
            setError(
              errorDescription === "Data agreement purpose exists"
                ? t("dataAgreements.purposeExist")
                : errorDescription
            );
            setOpenSnackBar(true);
          });
      } else return {};
    }
  };

  const onSave = (createdData: any) => {
    let active = false;
    let lifecycle = "draft";

    if (
      dataSources &&
      dataSources.length > 0 &&
      AttributeType === "data_using_service"
        ? validateDataSources(dataSources)
        : true
    ) {
      if (mode === "Create") {
        HttpService.addDataAgreements(
          DataAgreementPayload(createdData, active, lifecycle, mode)
        )
          .then(() => {
            successCallback();
            methods.reset({ ...defaultValue });
            setSelectedDropdownValue({});
            setOpen(false);
          })
          .catch((error) => {
            let errorDescription = error.response.data.errorDescription;
            setError(
              errorDescription === "Data agreement purpose exists"
                ? t("dataAgreements.purposeExist")
                : errorDescription
            );
            setOpenSnackBar(true);
          });
      } else if (mode === "Update" && isFormDataChanged(methods.formState)) {
        HttpService.updateDataAgreementById(
          DataAgreementPayload(
            createdData,
            active,
            lifecycle,
            mode,
            selectedDataAgreement
          ),
          selectedDataAgreement?.id
        )
          .then((response) => {
            successCallback();
            setSelectedDropdownValue({});
            methods.reset({ ...defaultValue });
            setOpen(false);
          })
          .catch((error) => {
            let errorDescription = error.response.data.errorDescription;
            setError(
              errorDescription === "Data agreement purpose exists"
                ? t("dataAgreements.purposeExist")
                : errorDescription
            );
            setOpenSnackBar(true);
          });
      } else return {};
    }
  };

  const enableSaveButtonFunction = () => {
    if (
      mode !== "Read" &&
      methods.formState.isValid &&
      // before validateSources consider old da as data sources are undefined
      (dataSources &&
      dataSources.length > 0 &&
      AttributeType === "data_using_service"
        ? validateDataSources(dataSources)
        : true) &&
      isFormDataChanged(methods.formState)
    ) {
      return true;
    } else return false;
  };

  const enableButtonFunction = () => {
    if (
      mode !== "Read" &&
      methods.formState.isValid &&
      // before validateSources consider old da as data sources are undefined
      (dataSources &&
      dataSources.length > 0 &&
      AttributeType === "data_using_service"
        ? validateDataSources(dataSources)
        : true) &&
      // if da is saved initially so during edit user can directly publish
      (selectedDataAgreement && selectedDataAgreement.lifecycle === "draft"
        ? selectedDataAgreement.lifecycle === "draft"
        : isFormDataChanged(methods.formState))
    ) {
      return true;
    } else return false;
  };

  return (
    <>
      <Drawer anchor="right" open={open}>
        <Container>
          <FormProvider {...methods}>
            <SnackbarComponent
              open={openSnackBar}
              setOpen={setOpenSnackBar}
              message={error}
            />
            <form>
              <HeaderContainer>
                <Box pl={2}>
                  <Typography color="#F3F3F6">
                    {mode === "Create" && t("dataAgreements.addDA")}
                    {mode === "Update" &&
                      `${t("dataAgreements.editDA")}:  ${
                        selectedDataAgreement?.purpose
                      }`}
                    {mode === "Read" &&
                      `${t("dataAgreements.viewDA")}: ${
                        selectedDataAgreement?.selectedRevision?.purpose ||
                        selectedDataAgreement?.purpose
                      }`}
                  </Typography>
                  {mode !== "Create" && (
                    <Typography color="#F3F3F6">
                      {resourceName === "userrecords"
                        ? dataAgreementIdForUserRecordes
                        : selectedDataAgreement?.id}
                    </Typography>
                  )}
                </Box>
                <CloseIcon
                  onClick={() => {
                    setOpen(false);
                    methods.reset({ ...defaultValue });
                  }}
                  sx={{
                    paddingRight: 2,
                    cursor: "pointer",
                    color: "#F3F3F6",
                  }}
                />
              </HeaderContainer>
              <BannerContainer>
                <Box
                  style={{ height: "150px", width: "100%" }}
                  component="img"
                  alt="Banner"
                  src={
                    coverImageBase64
                      ? `data:image/jpeg;charset=utf-8;base64,${coverImageBase64}`
                      : DefaultBanner
                  }
                />
              </BannerContainer>
              <Box sx={{ marginBottom: "60px" }}>
                <Avatar
                  src={
                    logoImageBase64
                      ? `data:image/jpeg;charset=utf-8;base64,${logoImageBase64}`
                      : DefaultLogo
                  }
                  style={{
                    position: "absolute",
                    marginLeft: 50,
                    marginTop: "-65px",
                    width: "110px",
                    height: "110px",
                    border: "solid white 6px",
                  }}
                />
              </Box>
              <DetailsContainer>
                <Box p={1.5}>
                  <Typography variant="h6" fontWeight="bold">
                    {organisationDetails.name}
                  </Typography>
                  <Typography variant="subtitle1" mt={3}>
                    {t("common.overView")}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    color="#9F9F9F"
                    mt={1}
                    sx={{ wordWrap: "breakWord" }}
                  >
                    {organisationDetails.description}
                  </Typography>

                  <Box mt={2}>
                    <Purpose open={props.open} mode={props.mode} />

                    <Version />

                    <DataExchangeModeFormControl
                      open={props.open}
                      mode={props.mode}
                      selectededDataAgreementFromDataAgreement={
                        selectededDataAgreementFromDataAgreement
                      }
                    />

                    <Typography
                      style={{
                        fontSize: "14px",
                        textDecoration: "underline",
                        color:
                          mode !== "Read" &&
                          AttributeType === "data_using_service"
                            ? "blue"
                            : "grey",
                        marginTop: "-7px",
                        cursor:
                          mode !== "Read" &&
                          AttributeType === "data_using_service"
                            ? "pointer"
                            : "not-allowed",
                      }}
                      onClick={() =>
                        mode !== "Read" &&
                        AttributeType === "data_using_service"
                          ? setOpenExistingSchemaModal(true)
                          : null
                      }
                    >
                      ({t("dataAgreements.configure")})
                    </Typography>

                    <PurposeDescription open={props.open} mode={props.mode} />

                    <LawfullBasisOfProcessingFormControll
                      open={props.open}
                      mode={props.mode}
                    />

                    <Typography variant="subtitle1">
                      {t("dataAgreements.dataPolicyConfigurations")}
                      <span style={{ color: "rgba(224, 7, 7, 0.986)" }}>*</span>
                    </Typography>
                    <DataAgreementPolicy mode={mode} />

                    <Typography variant="subtitle1">
                      {t("dataAgreements.DPIAConfigurations")}
                    </Typography>
                    <DPIAConfigurations mode={mode} />
                  </Box>

                  <DataAgreementPersonalDataTable
                    mode={mode}
                    append={append}
                    fields={fields}
                    remove={remove}
                    formController={control}
                  />
                </Box>
              </DetailsContainer>
              <FooterContainer
                style={{
                  flexDirection: "row-reverse",
                  justifyContent: "space-between",
                }}
              >
                <Button
                  variant="outlined"
                  style={
                    enableSaveButtonFunction()
                      ? buttonStyle
                      : disabledButtonstyle
                  }
                  sx={{
                    cursor: enableSaveButtonFunction()
                      ? "pointer"
                      : "not-allowed",
                    color: enableSaveButtonFunction() ? "black" : "#6D7676",
                    marginRight: "15px",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                  }}
                  onClick={methods.handleSubmit(onSave)}
                >
                  {t("common.save")}
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    cursor: enableButtonFunction() ? "pointer" : "not-allowed",
                    color: enableButtonFunction() ? "black" : "#6D7676",
                    "&:hover": {
                      backgroundColor: "black",
                      color: "white",
                    },
                    marginLeft: "15px",
                  }}
                  style={
                    enableButtonFunction() ? buttonStyle : disabledButtonstyle
                  }
                  onClick={methods.handleSubmit(onPublish)}
                >
                  {t("dataAgreements.publish")}
                </Button>
              </FooterContainer>
            </form>
          </FormProvider>

          <DataSchemaModal
            open={openExistingSchemaModal}
            setOpen={setOpenExistingSchemaModal}
            mode={mode}
            AttributeType={AttributeType}
            appendDataAttributes={appendDataAttributes}
            fieldsDataAttributes={fieldsDataAttributes}
            removeDataAttributes={removeDataAttributes}
            formController={control}
            methods={methods}
          />
        </Container>
      </Drawer>
    </>
  );
}
