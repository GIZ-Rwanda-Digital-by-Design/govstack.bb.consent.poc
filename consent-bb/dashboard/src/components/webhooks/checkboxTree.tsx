import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";

interface Props {
  control: any;
  getValues: any;
  setValue: any;
  setCheckWebhookIsSelected: Dispatch<SetStateAction<boolean>>;
  webhookEventTypesFromAPI: any;
}

const CheckboxTreeForAPIKey = (props: Props) => {
  const {
    control,
    getValues,
    setValue,
    setCheckWebhookIsSelected,
    webhookEventTypesFromAPI,
  } = props;
  const { t } = useTranslation("translation");

  const webhookEventTypes = webhookEventTypesFromAPI.map((type: any) => {
    if (type === "consent.allowed") {
      return "allowed";
    } else return "disallowed";
  });

  const [handleChangeTrigger, setandleChangeTrigger] = useState(false);

  const handleParentRadioChange = (value: string) => {
    if (value === "all") {
      webhookEventTypes.forEach((type: any) => {
        setValue(`webhookEventTypes.${type}`, true);
      });
    }
    setValue("radioGroup", value);
    setandleChangeTrigger(!handleChangeTrigger);
  };

  const handleCheckboxChange = (fieldName: string) => {
    if (
      fieldName === "webhookEventTypes.allowed" ||
      fieldName === "webhookEventTypes.disallowed"
    ) {
      const allChecked = webhookEventTypes.every((type: any) =>
        getValues(`webhookEventTypes.${type}`)
      );
      const anyChecked = webhookEventTypes.some((type: any) =>
        getValues(`webhookEventTypes.${type}`)
      );

      if (allChecked) {
        setValue("radioGroup", "all");
      } else if (anyChecked) {
        setValue("radioGroup", "selected");
      }
    }
    setandleChangeTrigger(!handleChangeTrigger);
  };

  useEffect(() => {
    let webhookEventTypesLength = webhookEventTypes.filter(
      (type: any) => getValues(`webhookEventTypes.${type}`) === true
    ).length;
    webhookEventTypesLength === 0
      ? setCheckWebhookIsSelected(false)
      : setCheckWebhookIsSelected(true);
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
                {t("webhooks.allEvents")}
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
                {t("webhooks.selectedEvents")}
              </>
            )}
          />
        </label>
      </div>
      {webhookEventTypes.map((type: any) => (
        <div key={type} style={{ margin: "10px" }}>
          <label
            style={{
              fontSize: 14,
              marginLeft: "20px",
              fontFamily: "Roboto,Helvetica,Arial,sans-serif",
            }}
          >
            <Controller
              name={`webhookEventTypes.${type}`}
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type="checkbox"
                    checked={field.value}
                    onChange={() => {
                      field.onChange(!field.value);
                      handleCheckboxChange(`webhookEventTypes.${type}`);
                    }}
                  />
                  {`consent.${type}`}
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
