<?php

namespace AddressWise\AddressWise\Helper;

use Magento\Framework\App\Helper\AbstractHelper;
use Magento\Framework\App\Helper\Context;
use Magento\Store\Model\ScopeInterface;

/**
 * Class Data
 *
 * @package AddressWise\AddressWise\Helper
 */
/**
 * Class Data
 *
 * @SuppressWarnings
 */
/**
 * Helper class for handling NZAU AddressWise functionality.
 *
 * @SuppressWarnings
 */
class Data extends AbstractHelper
{
    public const XML_PATH_NZPOST = 'addresswise/';

    /**
     * Data constructor.
     *
     * @param Context $context
     */
    public function __construct(Context $context)
    {
        parent::__construct($context);
    }

    /**
     * Get Config Value from Magento 2 backend
     *
     * @param string $field
     * @param int|null $storeId
     * @return string
     */
    public function getConfigValue(string $field, ?int $storeId = null): string
    {
        return $this->scopeConfig->getValue(
            $field,
            ScopeInterface::SCOPE_STORE,
            $storeId
        );
    }

    /**
     * if the block is enabled.
     *
     * @return bool
     */

    public function isEnabled(): bool
    {
        return $this->scopeConfig->isSetFlag('addresswise/general/enabled', ScopeInterface::SCOPE_STORE);
    }

    /**
     * Get the client token.
     *
     * @return string|null
     */

    public function getClientToken(): ?string
    {
        return $this->scopeConfig->getValue('addresswise/general/client_token', ScopeInterface::SCOPE_STORE);
    }
}
