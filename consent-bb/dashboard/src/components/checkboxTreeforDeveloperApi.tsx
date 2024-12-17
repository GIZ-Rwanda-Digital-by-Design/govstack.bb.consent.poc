import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  control: any;
  getValues: any;
  setValue: any;
  setCheckScopeIsSelected: Dispatch<SetStateAction<boolean>>;
}

const CheckboxTreeForAPIKey = (props: Props) => {
  const { control, getValues, setValue, setCheckScopeIsSelected } = props;
  const scopes = ["Config", "Audit", "Service", "Onboard"];
  const [handleChangeTrigger, setandleChangeTrigger] = useState(false);
  const { t } = useTranslation("translation");

  const handleParentRadioChange = (value: string) => {
    if (value === "all") {
      scopes.forEach((scope) => {
        setValue(`scopes.${scope}`, true);
      });
    }
    setValue("radioGroup", value);
    setandleChangeTrigger(!handleChangeTrigger);
  };

  const handleCheckboxChange = (fieldName: string) => {
    if (
      fieldName === "scopes.Config" ||
      fieldName === "scopes.Audit" ||
      fieldName === "scopes.Service" ||
      fieldName === "scopes.Onboard"
    ) {
      const allChecked = scopes.every((scope) => getValues(`scopes.${scope}`));
      const anyChecked = scopes.some((scope) => getValues(`scopes.${scope}`));

      if (allChecked) {
        setValue("radioGroup", "all");
      } else if (anyChecked) {
        setValue("radioGroup", "selected");
      }
    }
    setandleChangeTrigger(!handleChangeTrigger);
  };

  useEffect(() => {
    let scopesLength = scopes.filter(
      (scope) => getValues(`scopes.${scope}`) === true
    ).length;
    scopesLength === 0
      ? setCheckScopeIsSelected(false)
      : setCheckScopeIsSelected(true);
  }, [handleChangeTrigger]);

  return (
    <>
      <div style={{ marginTop: "10px" }}>
        <label
          style={{
            fontSize: 14,
            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
          }}
        >
          <Controller
            name="radioGroup"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="radio"
                  value="all"
                  style={{ fontSize: "14px" }}
                  checked={field.value === "all"}
                  onChange={() => handleParentRadioChange("all")}
                />
                {t("developerAPIs.allScopes")}
              </>
            )}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label
          style={{
            fontSize: 14,
            fontFamily: "Roboto,Helvetica,Arial,sans-serif",
          }}
        >
          <Controller
            name="radioGroup"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="radio"
                  value="selected"
                  checked={field.value === "selected"}
                  onChange={() => handleParentRadioChange("selected")}
                />
                {t("developerAPIs.selectedScopes")}
              </>
            )}
          />
        </label>
      </div>
      {scopes.map((scope) => (
        <div key={scope} style={{ margin: "10px" }}>
          <label
            style={{
              fontSize: 14,
              marginLeft: "20px",
              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            }}
          >
            <Controller
              name={`scopes.${scope}`}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={() => {
                      field.onChange(!field.value);
                      handleCheckboxChange(`scopes.${scope}`);
                    }}
                  />
                  {scope}
                </>
              )}
            />
          </label>
        </div>
      ))}
    </>
  );
};

export default CheckboxTreeForAPIKey;
